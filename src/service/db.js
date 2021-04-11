const config = require('config');
const firebase = require('firebase-admin');
const ShortUniqueId = require('short-unique-id').default;

const uid = new ShortUniqueId();

const isRequired = (item, message = 'Requred item undefined') => {
    if (!item) {
        throw new Error(message);
    }
};

firebase.initializeApp({
    credential: firebase.credential.cert(
        config.get('services.firebase.serviceAccount'),
    ),
    databaseURL: config.get('services.firebase.databaseURL'),
});

const db = firebase.database();
const bucket = firebase
    .storage()
    .bucket(config.get('services.firebase.storageBucket'));
const ref = db.ref();

const documentRef = type => ref.child(`${type}/`);

const get = async (id, type) => {
    isRequired(type);
    const record = db.ref(`${type.toUpperCase()}/${id}`);
    const result = await record.once('value').then(snapshot => snapshot.val());
    return result;
};

const scan = async type => {
    isRequired(type);
    const keys = [];
    const scanRef = db.ref(`${type}`);
    await scanRef.once('value', snap => {
        snap.forEach(item => {
            const itemVal = item.val();
            keys.push(itemVal);
        });
    });
    return keys;
};

const add = async (data, type, id) => {
    isRequired(type);
    const documentId = id || uid.randomUUID(32);
    const newRecord = documentRef(type);

    const now = new Date().toISOString();

    const allData = {
        ...data,
        ...{
            id: documentId,
            createdAt: `${now}`,
            updatedAt: `${now}`,
        },
    };
    // console.log('Insert: ', allData);

    await newRecord.child(documentId).set(allData);
    return allData;
};

const update = async (id, type, data, originalRecord) => {
    const now = new Date().toISOString();

    if (!originalRecord) {
        originalRecord = await get(id, type);
    }

    const allData = {
        ...originalRecord,
        ...data,
        ...{
            updatedAt: `${now}`,
        },
    };

    // console.log('Update: ', allData);

    data.id = id;
    isRequired(type);

    await documentRef(type)
        .child(id)
        .set(allData);
    return allData;
};

const getRecordByValue = async (type, name, value) => {
    isRequired(type);
    isRequired(name);
    isRequired(value);

    return documentRef(type)
        .orderByChild(name)
        .equalTo(value)
        .once('value')
        .then(snapshot => snapshot.val());
};

const remove = async (id, type) => {
    isRequired(type);
    const result = await db.ref(`${type.toUpperCase()}/${id}`).remove();
    return result;
};

// Firebase storage functions

const ucFirst = string => string.charAt(0).toUpperCase() + string.slice(1);



module.exports = {
    get,
    add,
    scan,
    remove,
    update,
    getRecordByValue


}