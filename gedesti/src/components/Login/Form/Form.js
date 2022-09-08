import './Form.css';


export default function Form() {
    return (
        <form>
            <header>
                <h1>Acesso ao <b>GEDESTI</b></h1>



                <img src="../imgs/weg-blue.png" alt="" />
            </header>

            <main>
                <div>
                    <label>Email</label>
                    <span className="material-symbols-outlined">alternate_email</span>
                    <input id="email" type="text" />
                </div>


                <div>
                    <label>Senha</label>
                    <span className="material-symbols-outlined">key</span>
                    <input id="password" type="password" />
                </div>

                <section>
                    <div>
                        <input id="checkbox" type="checkbox" />
                        <label>Lembrar-me</label>
                    </div>

                    <a href='/'>Esqueceu a senha?</a>
                </section>
            </main>

            <footer>
                <input type="submit" value={"Acessar"} />
            </footer>
        </form>
    )
}