import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../shared/models/Customer.model";
import { BASEURL } from "../shared/globalConstante";

@Injectable()
export class CustomerService {

  public customers!: Array<Customer>;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(`${BASEURL}/customer`);
  }

  public add(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${BASEURL}/customer`, customer);
  }

  public update(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${BASEURL}/customer/${id}`, customer);
  }

  public delete(id: number): Observable<string> {
    return this.http.delete<string>(`${BASEURL}/customer/${id}`);
  }
}
