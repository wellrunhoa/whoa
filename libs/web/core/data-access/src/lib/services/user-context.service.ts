import { Injectable } from "@angular/core";
import { App, SettingsService } from "@delon/theme";
import { Property } from "../models/property";
import { CurrentUser } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserContextService {
  constructor(private settings: SettingsService) {}

  setUser(value: CurrentUser) {
    this.settings.setUser(value)
  }

  get user(): CurrentUser {
    return this.settings.user;
  }

  setApp(value: App) {  
    this.settings.setApp(value);
  }

  get app(): App {
    return this.settings.app;
  }

  setProperty(value: Property) {
    this.settings.setData("property", value);
  }

  get property(): Property {
    return this.settings.getData("property");
  }
}