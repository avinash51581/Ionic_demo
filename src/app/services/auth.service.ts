import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpResponse, HttpErrorResponse  } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { tap } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';
import { RequestStatus } from 'src/app/models/RequestStatus';
import { throwError } from 'rxjs/internal/observable/throwError';

const httpOptions = {
  headers: new HttpHeaders({
   'Content-Type':  'application/json',
   'Access-Control-Allow-Origin': 'true'
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  token:any;

  constructor(private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService) { }

    login(email: String, password: String) {
      return this.http.post(this.env.API_URL + 'auth/login',
        {email: email, password: password}
      ).pipe(
        tap(token => {
          this.storage.setItem('token', token)
          .then(
            () => {
              console.log('Token Stored');
            },
            error => console.error('Error storing item', error)
          );
          this.token = token;
          this.isLoggedIn = true;
          return token;
        }),
      );
    }

    public getUsers():Observable<any[]> {
      return this.http.get<any[]>(this.env.API_URL + 'getAllAndroidUser', httpOptions);
     }


    register2(user:User ) {
      return this.http.post(this.env.API_URL + 'auth/register',
        {user}
      )
    }

    private handleError(error: HttpErrorResponse) {
      alert(error.status);
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
      } else {
        // The backend returned an unsuccessful response code.
      }
      // return an observable with a user-facing error message
      if (error.status === 412) {
        return throwError('go for captcha');
        } else if (error.status === 401) {
          return throwError('Invalid Username Or Password');
      } else if (error.status === 403) {
        return throwError('Access Denied');
      }
      return throwError('Server Error; please try again later.');
    }

    
      register(user:User): Observable<HttpResponse<RequestStatus>> {
              return this.http.post<RequestStatus>(this.env.API_URL + 'addNewAndroidUser',  user,{observe: 'response'})
              .pipe(map(response => {
                    return response;
              }), catchError(this.handleError) );
      }


    

     
    

    
    logout() {
      const headers = new HttpHeaders({
        'Authorization': this.token["token_type"]+" "+this.token["access_token"]
      });
      return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
      .pipe(
        tap(data => {
          this.storage.remove("token");
          this.isLoggedIn = false;
          delete this.token;
          return data;
        })
      )
    }

    
    user() {
      const headers = new HttpHeaders({
        'Authorization': this.token["token_type"]+" "+this.token["access_token"]
      });
      return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
      .pipe(
        tap(user => {
          return user;
        })
      )
    }

    
    getToken() {
      return this.storage.getItem('token').then(
        data => {
          this.token = data;
          if(this.token != null) {
            this.isLoggedIn=true;
          } else {
            this.isLoggedIn=false;
          }
        },
        error => {
          this.token = null;
          this.isLoggedIn=false;
        }
      );
    }





}
