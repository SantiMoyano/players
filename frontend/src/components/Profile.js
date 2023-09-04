function Profile({ data }) {
  return (
    <main>
      <figure className="profile">
        <img className="img-profile" src="profile.jpg" alt="scorpion" />
        <figcaption>scorpion99</figcaption>
        <p>Editar perfil / Loguearse / Desloguearse / Registrarse</p>
      </figure>
      <section>
        <p>Jugadores favoritos</p>
        <FavouritePlayers data={data} />
      </section>
    </main>
  );
}

function FavouritePlayers({ data }) {
  return (
    <section className="favourite-players">
      <ul>
        {data.map((el) => (
          <FavouritePlayer
            name={el.name}
            imageRoute={el.imageRoute}
            key={el.imageRoute}
          />
        ))}
      </ul>
    </section>
  );
}

function FavouritePlayer({ name, imageRoute }) {
  return (
    <li className="favourite-player">
      <figure>
        <img src={imageRoute} alt="arbol" />
        <figcaption>{name}</figcaption>
      </figure>
    </li>
  );
}
export default Profile;
