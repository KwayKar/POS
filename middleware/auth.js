export default function ({ store, redirect, route }) {
  const userRole = '' // store.getters['staff/getRole'];
  const allowedRoles = route.meta[0]?.roles || [];
  if (!allowedRoles.includes(userRole)) {
    // return redirect("/unauthorized");
  }
}
