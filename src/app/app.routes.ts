import { Routes } from "@angular/router";
import { AuthComponent } from "./components/auth/auth.component";
import { ViewerComponent } from "./components/viewer/viewer.component";

export const APP_ROUTES: Routes = [
  { path: "", component: ViewerComponent },
  { path: "auth", component: AuthComponent }
];
