import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {UserFullModel} from "../../../model/User/userFullModel";
import {serverAddress} from "../ServerAddress";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userCollection: UserFullModel[] = []
    private userCollectionSubject: BehaviorSubject<UserFullModel[]> = new BehaviorSubject<UserFullModel[]>(this.userCollection)

    private http = inject(HttpClient);
    private urlServer: string = serverAddress + "api/User"

    public async GetUserAll(): Promise<Observable<UserFullModel[]>> {
        if (this.userCollection.length === 0) {
            await this.initUser()
        }
        return this.userCollectionSubject.asObservable()
    }

    public async initUser(): Promise<UserFullModel[]> {
        try {
            const data: UserFullModel[] | undefined = await this.http.get<UserFullModel[]>(this.urlServer).toPromise();

            if (data !== undefined) {
                for (const typeItem of data) {
                    //  typeItem.registerDt = this.formatData(typeItem.registerDt);
                    //  typeItem.lastLoginDt = this.formatData(typeItem.lastLoginDt);
                    this.userCollection.push(typeItem);
                }
                this.userCollectionSubject.next(this.userCollection);
                return this.userCollection;
            } else
                throw new Error("Ошибка данных")
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public editUser(data: UserFullModel): void {
        if (data.id) {
            const body = {
                id: data.id,
                login: data.login,
                name: data.name,
                email: data.email,
                active: data.active,
                userRole: data.userRole
            }


            this.http.put(this.urlServer, body).subscribe(
                (data: any) => {
                    const index = this.userCollection.findIndex(
                        (item) => data.id === item.id)
                    if (index !== -1) {
                        this.userCollection[index] = data
                        this.userCollectionSubject.next(this.userCollection.slice())
                    }
                }, error => console.log(error)
            )
        }

    }


    checkLogin(inputLogin: string) {
        if (this.userCollection.find((item) => item.login === inputLogin))
            return "Такой логи уже существует"
        return undefined
    }

    checkMail(inputMail: string) {
        if (this.userCollection.find((item) => item.email === inputMail))
            return "Такая почта уже существует"
        return undefined;
    }

    editUserSelf(formData: FormData) {
        return this.http.put(this.urlServer + "/editUserSelf", formData)
    }

    passwordChange(formDate: FormData) {
        return this.http.put(this.urlServer + "/passwordEdit", formDate)

    }
}
