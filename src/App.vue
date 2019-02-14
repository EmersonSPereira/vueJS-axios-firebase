<template>
  <div
    id="app"
    class="container"
  >
    <h1>HTTP com Axios</h1>
    <b-card>
      <b-form-group label="Nome:">
        <b-form-input
          type="text"
          v-model="usuario.nome"
          required
          placeholder="Digite seu email"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="email: ">
        <b-form-input
          type="email"
          v-model="usuario.email"
          required
          placeholder="Digite seu email"
        ></b-form-input>
      </b-form-group>
      <div class="col-xs-2">
        <b-form-group label="Idade: ">
          <b-form-input
            type="text"
            v-model="usuario.idade"
            required
            placeholder="Digite sua idade"
          ></b-form-input>
        </b-form-group>
      </div>
      <hr>
      <button
        @click="salvar"
        type="button"
        class="btn btn-primary btn-lg"
      >Salvar</button>
      <button
        @click="exibirUsuarios()"
        type="button"
        class="btn btn-success btn-lg ml-2"
      >Exibir</button>
    </b-card>
    <hr>
    <b-list-group>
      <b-list-group-item
        v-for="(usuario, id) in usuarios"
        :key="id"
      ><strong>ID: </strong>{{ id }} <br>
        <strong>Nome: </strong>{{ usuario.nome }} <br>
        <strong>Email: </strong>{{ usuario.email }}<br>
        <strong>idade: </strong>{{ usuario.idade }}<br>
        <b-button
          class="mr-2"
          variant="warning"
          size="lg"
          @click="carregar(id)"
        >Editar</b-button>
        <b-button
          variant="danger"
          size="lg"
          @click="deletar(id)"
        >Deletar</b-button>

      </b-list-group-item>
    </b-list-group>

  </div>
</template>

<script>

export default {
  data () {
    return {
      id: null,
      usuarios: [],
      usuario: {
        nome: "",
        idade: "",
        email: "",


      }
    };
  },
  methods: {
    limpar () {
      this.usuario.nome = "",
        this.usuario.email = "",
        this.usuario.idade = "",
        this.id = null
    },
    carregar (id) {
      this.id = id
      this.usuario = { ...this.usuarios[id] }
    },
    deletar (id) {
      this.$swal.fire({
        title: 'Você tem certeza?',
        text: "Ao clicar em sim o usuário sera deletado e não sera possível recuperalo",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
          this.$swal.fire(
            'Deletado!',
            'Usuário deletado com sucesso',
            'success'
          ), this.$http.delete(`/usuarios/${id}.json`).then(() => this.limpar()),
            this.exibirUsuarios()
        }
      })

    },

    salvar () {
      if (this.id == null) {        this.$http.post("usuarios.json", this.usuario)
        .then(() => {
          this.limpar()
          this.$swal.fire({
            position: 'center',
            type: 'success',
            title: 'Salvo com sucesso',
            showConfirmButton: false,
            timer: 2000
          })
        })
      }
      else {
        this.$http.patch(`/usuarios/${this.id}.json`, this.usuario)
          .then(() => {
            this.limpar()
            this.exibirUsuarios()
            this.$swal.fire({
              position: 'center',
              type: 'success',
              title: 'Atualizado com sucesso',
              showConfirmButton: false,
              timer: 2000
            })
          })
      }

    },
    exibirUsuarios () {

      this.$http.get("usuarios.json").then(res => {
        //this.usuarios = Object.values(res.data);
        this.usuarios = res.data

        // console.log(this.usuarios);
      });
    }
  }
  // created() {
  // 	this.$http.post('usuarios.json', {
  // 		nome: 'Emerson sousa',
  // 		idade: 25,
  // 		email: 'emerson@emerson.com'

  // 	})
  // }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 1.5rem;
}

#app h1 {
  text-align: center;
  margin: 50px;
}
</style>
