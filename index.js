let contador = document.querySelector("#contador");
let play = document.querySelector(".play");
let pause = document.querySelector(".pause");
let reset = document.querySelector(".reset");
let mark = document.querySelector(".mark");
let showMark = document.querySelector(".show-mark");


document.addEventListener('DOMContentLoaded', () => {
    let idInterval;
    let initialTime = null;
    let timeDif = 0;
    let markList = [];


    const btnPlay = () => {
        const nowDate = new Date();
        initialTime = new Date(nowDate.getTime() - timeDif);
        //se limpia el intervalo de tiempo
        clearInterval(idInterval);
        idInterval = setInterval(() => {
            const now = new Date();
            //se resta el tiempo actual con el tiempo de inicio, con eso conseguimos el tiempo transcurrido
            const dif = now.getTime() - initialTime.getTime();
            contador.textContent = convert(dif);
            //console.log(now, " - ", dif);
        }, 100);

    }
    const addZero = (e) => {
        if (e < 10) {
            return "0" + e;
        } else {
            return "" + e;
        }
    }
    //funcion que convierte milisegundos a minutos y segundos
    const convert = (milisec) => {
        const minutes = parseInt(milisec / 1000 / 60);
        milisec -= minutes * 60 * 1000;
        seconds = (milisec / 1000);
        return `${addZero(minutes)}:${addZero(seconds.toFixed(1))}`;
    }
    //funcion para refrescar tiempo
    const refreshTime = () => {
        const now = new Date();
        const dif = now.getTime() - initialTime.getTime();
        contador.textContent = convert(dif);
    }
    //funcion pausar tiempo
    const btnPause = () => {
        timeDif = new Date() - initialTime.getTime();
        clearInterval(idInterval);
    }
    //funcion reiniciar cronometro
    const btnReset = () => {
        initialTime = new Date();
        clearInterval(idInterval);
        timeDif = 0;
        play.style.display = '';
        markList = [];
        showMark.innerHTML = "";
        console.log(markList);
        init();
    }

    const markFlag = () => {
        const now = new Date();
        const currentTime = new Date(now.getTime() - initialTime);
        console.log(markList);
        markList.push({ hora: convert(currentTime) });
        let obj = markList.map((i, e) => {


            return "<ul><li>vuelta="+(e+1)+" | "+" hora="+i.hora+"</li></ul>";
        }).join("");
        showMark.innerHTML = obj;
    }

    const init = () => {
        contador.textContent = "00:00.0";
        pause.style.display = 'none';

    }
    init();
    reset.addEventListener('click', () => {
        btnReset();
    })
    play.addEventListener('click', () => {
        btnPlay();
        play.style.display = 'none';
        pause.style.display = "";
    });
    pause.addEventListener('click', () => {
        btnPause();
        pause.style.display = 'none';
        play.style.display = '';
    });
    mark.addEventListener('click', () => {
        markFlag();
    })

})