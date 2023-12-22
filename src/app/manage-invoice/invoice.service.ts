import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Invoice } from "../shared/models/Invoice.model";
import { BASEURL } from "../shared/globalConstante";

@Injectable()
export class InvoiceService {

  public invoice!: Invoice;

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Array<Invoice>> {
    return this.http.get<Array<Invoice>>(`${BASEURL}/invoice`);
  }

  public add(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${BASEURL}/invoice`, invoice);
  }

  public update(id: number, invoice: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(`${BASEURL}/invoice/${id}`, invoice);
  }

  public delete(id: number): Observable<string> {
    return this.http.delete<string>(`${BASEURL}/invoice/${id}`);
  }
}
