import {BroadcastDb, commitHash} from '..';

console.log('COMMIT HASH', commitHash);

(new BroadcastDb()).then(db => {
    const result = db.getBroadcastsBetween(0,30000);
    console.table(result.values);
    console.log(result.columns);
});

