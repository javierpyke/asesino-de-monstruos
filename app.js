new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
        },
        atacar: function () {
            let ataque = this.calcularHeridas(this.rangoAtaque);
            this.saludMonstruo -= ataque;

            if(this.verificarGanador()){
                return
            }
            this.registrarEvento({esJugador : true, text:`EL JUGADOR GOLPEA AL MONSTRUO POR ${ataque}`})


            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            let ataque = this.calcularHeridas(this.rangoAtaqueEspecial);
            this.saludMonstruo -= ataque;

            if(this.verificarGanador()){
                return
            }
            this.registrarEvento({esJugador : true, text:`EL JUGADOR GOLPEA DURAMENTE AL MONSTRUO POR ${ataque}`})

            this.ataqueDelMonstruo();
        },

        curar: function () {
            if(this.saludJugador <= 90){
                this.saludJugador +=10;
            } else {
                this.saludJugador = 100
            }
            
            this.registrarEvento({esJugador : true, text:`EL JUGADOR RECUPERA ENERGIA`})
            
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
            this.turnos.unshift(evento)
        },
        terminarPartida: function () {
            if(confirm('Te rendiste! Jugar de nuevo?')){
                this.saludJugador = 100;
                this.saludMonstruo = 100;
                this.turnos = []
                this.empezarPartida()
            } else {
                this.hayUnaPartidaEnJuego = false
            }

            
        },

        ataqueDelMonstruo: function () {
            let ataque = this.calcularHeridas(this.rangoAtaqueDelMonstruo);
            this.saludJugador -= ataque;

            this.registrarEvento({esJugador : false, text:`EL MONSTRUO LASTIMA AL JUGADOR EN ${ataque}`})

            return this.verificarGanador()
        },

        calcularHeridas: function (rango) {
            return Math.max(Math.floor(Math.random() * rango[1]) + 1, rango[0])

        },
        verificarGanador: function () {
            if(this.saludMonstruo <= 0){
                if(confirm('Ganaste! Jugar de nuevo?')){
                    this.saludJugador = 100;
                    this.saludMonstruo = 100;
                    this.turnos = []
                    this.empezarPartida()
                } else {
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            } else if (this.saludJugador <= 0 ){
                if(confirm('Perdiste Jugar de nuevo?')){
                    this.saludJugador = 100;
                    this.saludMonstruo = 100;
                    this.turnos = []
                    this.empezarPartida()
                } else {
                    this.hayUnaPartidaEnJuego = false
                }
                return true
            }
            return false
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});