import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const token = localStorage.getItem("token");
  if (token) {
    if (token === "MR742mynp9JXZ8t37wRJP75K") {
      return true;
    } else {
      alert("Vous n'êtes pas autorisé à accéder à cette page.")
      return false;
    }
  } else {
    alert("Vous n'êtes pas autorisé à accéder à cette page.");
    return false;
  }
};
