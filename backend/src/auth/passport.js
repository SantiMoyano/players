const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/User"); // Importa tu modelo de usuario

// Configura la estrategia local de Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "username", // Define el campo que contiene el nombre de usuario
      passwordField: "password", // Define el campo que contiene la contraseña
    },
    async (username, password, done) => {
      try {
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: "Usuario no encontrado" });
        }

        if (!user.validPassword(password)) {
          return done(null, false, { message: "Contraseña incorrecta" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize y Deserialize User para la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
