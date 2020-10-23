import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

import { Role } from '../_models';

const users = 
[{
        role: Role.User,
        id: 1,
        firstName: "Harish",
        lastName: "Vannala",
        username: "HarishV",
        createdDate: "2020-09-25T13:15:22.355Z",
        loginTime: "2020-09-26T06:56:31.365Z",
        logoutTime: "2020-09-26T06:56:38.263Z",
        password: 'passord@123'
    },
    {
        role: Role.User,
        id: 2,
        username: "srikanthsriram",
        firstName: "srikanth",
        lastName: "Sriram",
        createdDate: "2020-09-26T06:00:21.348Z",
        password: 'passord@123'
        
    },
    {
        role: Role.Auditor,
        id: 3,
        username: "srikanthsriramaudit",
        firstName: "srikanth",
        lastName: "Sriram",
        createdDate: "2020-09-26T06:00:21.348Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 4,
        username: "srikanthsriramaudit2",
        firstName: "srikanth",
        lastName: "Sriram",
        createdDate: "2020-09-26T06:00:21.348Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 5,
        username: "srikanthsriramaudit3",
        firstName: "srikanth",
        lastName: "Sriram",
        createdDate: "2020-09-26T06:00:21.348Z",
        password: 'passord@123'
    },
    {
        role: Role.User,
        id: 6,
        username: "srikanthsriram2",
        firstName: "srikanth",
        lastName: "Sriram",
        createdDate: "2020-09-26T06:00:21.348Z",
        password: 'passord@123'
    },
    {
        role: "User",
        id: 7,
        username: "srikanthsriram3",
        firstName: "srikanth",
        lastName: "Sriram",
        createdDate: "2020-09-26T06:00:21.348Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 8,
        firstName: "Amrutham",
        lastName: "Suresh",
        username: "sureshamrutham",
        createdDate: "2020-09-28T07:54:25.176Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 9,
        firstName: "Amrutham ",
        lastName: "Suresh",
        username: "amrutham_suresh",
        createdDate: "2020-09-28T09:29:00.987Z",
        password: 'passord@123'
    },
    {
        role: Role.User,
        id: 10,
        firstName: "harish",
        lastName: "bollam",
        username: "harish_bollam",
        createdDate: "2020-09-29T03:08:27.147Z",
        loginTime: "2020-09-29T17:08:37.837Z",
        logoutTime: null,
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 11,
        username: "hari_1",
        firstName: "hari",
        lastName: "b",
        createdDate: "2020-09-29T03:35:06.709Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 12,
        username: "hari_2",
        firstName: "hari",
        lastName: "b",
        createdDate: "2020-09-29T03:35:46.739Z",
        password: 'passord@123'
    },
    {
        role: Role.User,
        id: 13,
        firstName: "test",
        "clientIP": "106.220.109.138",
        lastName: "test",
        username: "test2",
        createdDate: "2020-09-29T15:46:38.212Z",
        password: 'passord@123'
    },
    {
        role: Role.User,
        id: 14,
        firstName: "ak",
        lastName: "ak",
        username: "aditi",
        createdDate: "2020-09-29T16:34:55.197Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 15,
        firstName: "pk",
        lastName: "pk",
        username: "pk",
        createdDate: "2020-09-29T16:35:08.989Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 16,
        firstName: "testhjgj",
        lastName: "hjgjg",
        username: "kljlklj",
        createdDate: "2020-10-05T07:01:45.277Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 17,
        firstName: "san1",
        lastName: "kumar",
        username: "santhan1",
        createdDate: "2020-10-05T07:41:26.154Z",
        loginTime: "2020-10-05T07:41:33.545Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 18,
        firstName: "vamsi",
        lastName: "krishna",
        username: "vamsi",
        createdDate: "2020-10-05T08:30:08.516Z",
        clientIP: "192.168.0.108",
        loginTime: "2020-10-05T11:04:09.445Z",
        logoutTime: "2020-10-05T11:03:04.355Z",
        password: 'passord@123'
    },
    {
        role: Role.User,
        id: 19,
        firstName: "test",
        lastName: "test",
        username: "vamsi1",
        createdDate: "2020-10-05T10:30:14.829Z",
        clientIP: "192.168.225.194",
        loginTime: "2020-10-05T10:30:26.768Z",
        logoutTime: "2020-10-05T10:30:32.260Z",
        password: 'passord@123'
    },
    {
        role: "admin",
        id: 20,
        firstName: "test",
        lastName: "test",
        username: "vamsi2",
        createdDate: "2020-10-05T10:33:58.308Z",
        clientIP: "192.168.0.108",
        loginTime: "2020-10-05T11:03:10.808Z",
        logoutTime: "2020-10-05T11:03:55.642Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 21,
        firstName: "santhan",
        lastName: "kumar",
        username: "san123",
        createdDate: "2020-10-06T08:45:10.339Z",
        clientIP: "192.168.0.105",
        loginTime: "2020-10-06T08:45:17.766Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 22,
        firstName: "ak",
        lastName: "ak",
        username: "ak",
        createdDate: "2020-10-07T01:39:30.755Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 23,
        firstName: "qae",
        lastName: "asd",
        username: "ad",
        createdDate: "2020-10-07T09:26:01.849Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 24,
        firstName: "test",
        lastName: "test",
        username: "test",
        createdDate: "2020-10-07T09:29:01.663Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 25,
        firstName: "test",
        lastName: "n",
        username: "test123",
        isAuditor: true,
        createdDate: "2020-10-07T10:18:39.694Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 26,
        firstName: "santhan",
        lastName: "kumar",
        username: "san1234",
        createdDate: "2020-10-07T12:52:43.947Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 27,
        firstName: "vahini",
        lastName: "123",
        username: "1122",
        createdDate: "2020-10-07T17:20:54.582Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 28,
        firstName: "test",
        lastName: "t",
        username: "user123",
        createdDate: "2020-10-07T17:21:57.901Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 29,
        firstName: "sravani",
        lastName: "s",
        username: "s",
        isAuditor: true,
        createdDate: "2020-10-07T17:25:37.372Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 30,
        firstName: "ss",
        lastName: "a",
        username: "a",
        isAuditor: false,
        createdDate: "2020-10-08T03:39:45.892Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 31,
        firstName: "a",
        lastName: "a",
        username: "auditor@gmail.com",
        isAuditor: true,
        createdDate: "2020-10-08T04:37:00.754Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 32,
        firstName: "auditor",
        lastName: "a",
        username: "auditor",
        isAuditor: true,
        createdDate: "2020-10-08T04:41:44.161Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 33,
        firstName: "new user",
        lastName: "new user",
        username: "newuser@gmail.com",
        isAuditor: true,
        createdDate: "2020-10-08T06:10:52.635Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 34,
        firstName: "suji",
        lastName: "suji",
        username: "suji123",
        isAuditor: true,
        createdDate: "2020-10-08T07:08:10.611Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 35,
        firstName: "Test",
        lastName: "User",
        username: "test@test.com",
        isAuditor: true,
        createdDate: "2020-10-08T11:27:04.739Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 36,
        firstName: "test",
        lastName: "test",
        username: "test@test2.com",
        isAuditor: false,
        createdDate: "2020-10-08T11:46:34.467Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 37,
        loginTime: "2020-10-10T14:59:38.744Z",
        logoutTime: "2020-10-10T15:34:53.619Z",
        firstName: "test",
        lastName: "user",
        username: "testuser",
        createdDate: "2020-10-10T12:57:52.768Z",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 38,
        firstName: "test",
        lastName: "testg",
        username: "testg@test.com",
        createdDate: "2020-10-20T04:55:43.923Z",
        clientclientIPlogin: "::ffff:127.0.0.1",
        lastlogin: "2020-10-20T05:10:14.286Z",
        clientIP: "::ffff:127.0.0.1",
        lastlogout: "2020-10-20T05:05:34.596Z",
        password: 'passord@123'
    },
    {
        role: Role.User,
        id: 39,
        firstName: "Raghunath",
        lastName: "V",
        username: "Raghunath",
        createdDate: "2020-10-20T06:58:22.908Z",
        loginTime: "2020-10-20T07:11:04.790Z",
        clientIP: "127.0.0.1",
        password: 'passord@123'
    },
    {
        role: Role.Auditor,
        id: 40,
        firstName: "Raghu",
        lastName: "V",
        username: "Raghu",
        createdDate: "2020-10-20T06:58:22.908Z",
        loginTime: "2020-10-20T07:11:04.790Z",
        clientIP: "127.0.0.1",
        password: 'passord@123'
    }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();        

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                loginTime: user.loginTime,
                logoutTime: user.logoutTime,
                clientIP: user.clientIP,
                token: `fake-jwt-token.${user.id}`
            });
        }

        function getUsers() {
            if (!isAuditor()) return unauthorized();
            return ok(users);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            // only auditor can access other user records
            if (!isAuditor() && currentUser().id !== idFromUrl()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        // helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function error(message) {
            return throwError({ status: 400, error: { message } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAuditor() {
            return isLoggedIn() && currentUser().role === Role.Auditor;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization').split('.')[1]);
            return users.find(x => x.id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
    }
}

// export const fakeBackendProvider = {
//     // use fake backend in place of Http service for backend-less development
//     provide: HTTP_INTERCEPTORS,
//     useClass: FakeBackendInterceptor,
//     multi: true
// };