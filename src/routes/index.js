const { db } = require("../firebase.js");
const { Router } = require("express");
const router = Router();
//routes

//Listamos los contactos
router.get("/", async (req, res) => {
  //me conecto a la base de datos
  const querySnapshot = await db.collection("contacts").get();

  //recorro con un map la base de datos
  const contacts = querySnapshot.docs.map((doc) => ({
    //devuelvo el arreglo de la base de datos
    id: doc.id,
    ...doc.data(),
  }));
  res.render("index", { contacts });
});

//Agregamos contactos nuevos
router.post("/new-contacts", async (req, res) => {
  //Guardo los dato del formulario atravez de esta consulta
  const { firstname, lastname, email, phone } = req.body;
  await db.collection("contacts").add({
    firstname,
    lastname,
    email,
    phone,
  });
  res.redirect("/");
});

//Aca editamps los contactos de la base de datos
//siempre poner el id de lo que queremos editar en la ruta
router.get("/edit-contact/:id", async (req, res) => {
  //Le paso el id con el reques params
  const doc = await db.collection("contacts").doc(req.params.id).get();
  console.log({
    id: doc.id,
    ...doc.data(),
  });
   res.render('index', {contacts: {id: doc.id, ...doc.data()}})
});

//Aca borramos contactos de la base de datos
//siempre poner el id de lo que vamos a borrar a la ruta
router.get("/delete-contact/:id", async (req, res) => {
  await db.collection("contacts").doc(req.params.id).delete();
  res.redirect("/");
});

//Aca actualizamos un contacto de la base de datos
router.post("/update-contacts/:id", async (req, res) => {
  //Destructurar el params para sacar el id //es solo otro metodo
  const { id } = req.params;
  await db.collection("contacts").doc(id).update(req.body);
  res.redirect("/");
});
module.exports = router;
