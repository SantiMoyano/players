function CreatePlayer() {
  return (
    <section className="create-player-content">
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" />
        </div>
        <div>
          <label htmlFor="score">Score:</label>
          <input type="number" id="score" name="score" />
        </div>
        <div>
          <label htmlFor="trophy">Trophies:</label>
          <input type="number" id="trophy" name="trophy" />
        </div>
        <div>
          <label htmlFor="tags">Tags:</label>
          <input type="text" id="tags" name="tags" />
        </div>
        <div>
          <label htmlFor="image">IMAGEN:</label>
          <input type="file" id="image" name="image" accept="image/image" />
        </div>
        <div>
          <label htmlFor="gif">GIF: </label>
          <input type="file" id="gif" name="gif" accept="image/gif" />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea id="description" name="description" rows="4"></textarea>
        </div>
        <button type="submit">CREAR JUGADOR</button>
      </form>
    </section>
  );
}

export default CreatePlayer;
