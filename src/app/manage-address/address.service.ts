import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Address } from "../shared/models/Address.model";
import { BASEURL } from "../shared/globalConstante";

@Injectable()
export class AddressService {
  public addressList!: Array<Address>;
  constructor(private http: HttpClient) { }

  public getAll(): Observable<Array<Address>> {
    return this.http.get<Array<Address>>(`${BASEURL}/address`);
  }

  public add(address: Address): Observable<Address> {
    return this.http.post<Address>(`${BASEURL}/address`, address);
  }

  public update(id: number, address: Address): Observable<Address> {
    return this.http.put<Address>(`${BASEURL}/address/${id}`, address);
  }

  public delete(id: number): Observable<string> {
    return this.http.delete<string>(`${BASEURL}/address/${id}`);
  }
}
