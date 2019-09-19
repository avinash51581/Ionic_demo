import { SQLiteDatabaseConfig, SQLiteObject } from "@ionic-native/sqlite/ngx";

//Cordova in Browser
export class SQLiteMock {
    public create(config: SQLiteDatabaseConfig): Promise<SQLiteObject> {
    
        return new Promise((resolve,reject)=>{
        resolve(new SQLiteObject(new Object()));
        });
    }


    
    }