import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Media } from "../models/media";

@Injectable({
  providedIn: "root",
})
export class MediaService {
  private endpoint = environment.hostServer;
  constructor(private http: HttpClient) {}

  getMedias(): Observable<Media[]> {
    return this.http.get<Media[]>(`${this.endpoint}/media`);
  }

  getMedia(id: string | null): Observable<Media> {
    return this.http.get<Media>(`${this.endpoint}/media/${id}`);
  }

  updateMedia(id: string, medias: Media): Observable<Media> {
    return this.http.put<Media>(`${this.endpoint}/media/${id}`, medias);
  }

  saveMedia(medias: any): Observable<Media> {
    return this.http.post<Media>(`${this.endpoint}/media`, medias);
  }

  deleteMedia(mediaId: string) {
    return this.http.delete(`${this.endpoint}/media/${mediaId}`);
  }

  uploadCsv(formData: any): Observable<any> {
    return this.http.post(`${this.endpoint}/medias/upload/csv`, formData, {
      reportProgress: true,
      observe: "events",
    });
  }
}
