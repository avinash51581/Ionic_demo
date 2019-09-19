import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';



export interface Dev{
  id:number,
  name:string,
  skills:any[],
  img:string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject;
   win: any = window;

  options: any = {
    name: 'nabard.db',
    location: 'default'
  }
  theConsole: string = "Console Messages";
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  sqlstorage: SQLite;
  developers = new BehaviorSubject([]);
  products = new BehaviorSubject([]);

  //Creating DataBase
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter,private sqlite: SQLite, private http: HttpClient) {
    //this.connectToDb();
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'developers.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });

  }


  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
      
        .then(_ => {
          console.log(sql);
          this.loadDevelopers();
          this.loadProducts();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }


  private connectToDb():void {
    this.sqlite.create(this.options)
        .then((db: SQLiteObject) => {
           this.database = db;
            var sqltbldeveloper = 'CREATE TABLE IF NOT EXISTS tbldeveloper(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,skills TEXT,img TEXT)';
            this.database.executeSql(sqltbldeveloper,[])
            var sqltblProduct = 'CREATE TABLE IF NOT EXISTS tblproduct(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,creatorId INTEGER)';
            this.database.executeSql(sqltblProduct,[])

            this.loadDevelopers()
            //this.loadProducts()
            .then(() => console.log("Table user Created Successfully" + sqltbldeveloper ))
            .catch(e => console.log("Exception Occur" + JSON.stringify(e)));
        })
        .catch(e => this.theConsole += JSON.stringify(e));
}

  
    getDatabaseState(){
      return this.dbReady.asObservable();
    }
    getDevs():Observable<any[]>{
      console.log("Get devs" +this.products.asObservable());
        return this.developers.asObservable();
    }
    getProducts():Observable<any[]>{
      console.log("Get Products" +this.products.asObservable());
      return this.products.asObservable();
    }

    


  public getRowCount1(){
      console.log("In getRowCount");
       this.database.executeSql('select * from tbldeveloper',[]).then(data=>{
        let count:Number;
        count=data.rows.length;
        return count;
      });
    }

   
    
    

    loadDevelopers() {
      return this.database.executeSql('SELECT * FROM tbldeveloper', []).then(data => {
        let developers: Dev[] = [];
        
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            let skills = [];
            if (data.rows.item(i).skills != '') {
              skills = JSON.parse(data.rows.item(i).skills);
            }
             developers.push({ 
              id: data.rows.item(i).id,
              name: data.rows.item(i).name, 
              skills: skills, 
              img: data.rows.item(i).img
             });
          }
        }

        console.log("L" + data.rows.length);

        this.developers.next(developers);
        console.log(developers);
      });
    }

    addDeveloper(name, skills, img) {
      let data = [name, JSON.stringify(skills), img];
      return this.database.executeSql('INSERT INTO tbldeveloper (name, skills, img) VALUES (?, ?, ?)', data).then(data => {
          this.loadDevelopers();
      });
    }



    getDeveloper(id): Promise<Dev> {
      return this.database.executeSql('SELECT * FROM tbldeveloper WHERE id = ?', [id]).then(data => {
        let skills = [];
        if (data.rows.item(0).skills != '') {
          skills = JSON.parse(data.rows.item(0).skills);
        }
   
        return {
          id: data.rows.item(0).id,
          name: data.rows.item(0).name, 
          skills: skills, 
          img: data.rows.item(0).img
        }
      });
    }

    
    deleteDeveloper(id){
      return this.database.executeSql('DELETE FROM tbldeveloper WHERE id= ?',[id]).then(_=>{
            this.loadDevelopers();
            this.loadProducts();
      });
    }

    updateDeveloper(dev: Dev) {
      let data = [dev.name, JSON.stringify(dev.skills), dev.img];
      console.log("updateDeveloper" + data);
      return this.database.executeSql(`UPDATE tbldeveloper SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(data => {
        this.loadDevelopers();
      })
    }
    
    loadProducts(){
      console.log("In LoadProducts");
      let query='SELECT tblproduct.name,tblproduct.id,tbldeveloper.name AS creator FROM tblproduct JOIN tbldeveloper ON tbldeveloper.id=tblproduct.creatorId ';
      return this.database.executeSql(query,[]).then(data=>{
        let productsDev=[];
        
        if(data.rows.length>0){
          for(var i=0;i<data.rows.length;i++){
              productsDev.push({
              name:data.rows.item(i).name,
              id:data.rows.item(i).id,
              creator:data.rows.item(i).creator,
            });

          }
        }
        this.products.next(productsDev);
        console.log("Products"+this.products);

      });
    }

    addProduct(name, creator) {
    let data = [name, creator];
    return this.database.executeSql('INSERT INTO tblproduct (name, creatorId) VALUES (?, ?)', data).then(data => {
      this.loadProducts();
    });
  }
}
