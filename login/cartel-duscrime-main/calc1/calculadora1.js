document.getElementById("calcular1").addEventListener("click", () => {
    const cofres = [
        { nome: "Cofre BPS", icone: "🌋", ganho: "R$214.000", intervalo: 520, id: "CofreBPSInput" },
        { nome: "Navio", icone: "🚢", ganho: "R$165.000", intervalo: 150, id: "NavioInput" },
        { nome: "Ilha", icone: "🏝️", ganho: "R$218.000", intervalo: 150, id: "IlhaInput" },
        { nome: "Bar", icone: "🍺", ganho: "R$60.000", intervalo: 150, id: "BarInput" },
        { nome: "Loja de Armas 3", icone: "🔫", ganho: "R$60.000", intervalo: 150, id: "LojaDeArmasInput" },
        { nome: "Cassino", icone: "🎰", ganho: "R$100.000", intervalo: 150, id: "CassinoInput" },
        { nome: "Lotérica SF", icone: "💳", ganho: "R$60.000", intervalo: 150, id: "LotericaSFInput" },
        { nome: "Banco Central", icone: "🏛️", ganho: "R$219.000", intervalo: 220, id: "BancoCentralInput" }
    ];

    const horarios = cofres.map((cofre) => {
        const horaInput = document.getElementById(cofre.id).value;

        if (!horaInput) {
            return { texto: `${cofre.icone} ${cofre.nome}: SEM INFO | 💰 ${cofre.ganho}`, timestamp: Infinity };
        }

        const [horas, minutos] = horaInput.split(":").map(Number);
        const horarioFinal = new Date();
        horarioFinal.setHours(horas, minutos);
        horarioFinal.setMinutes(horarioFinal.getMinutes() + cofre.intervalo);

        const horarioFormatado = horarioFinal.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        return { texto: `${cofre.icone} ${cofre.nome}: ${horarioFormatado} | 💰 ${cofre.ganho}`, timestamp: horarioFinal.getTime() };
    });

    const listaOrdenada = horarios.sort((a, b) => a.timestamp - b.timestamp);

    const resultadoDiv = document.getElementById("resultado1");
    resultadoDiv.innerHTML = `
        <h3>💰📊 HORÁRIOS DE ROUBOS Cartel DusCrime 📊💰</h3>
        <ul>${listaOrdenada.map((item) => `<li>${item.texto}</li>`).join("")}</ul>
        <h3>💰📊 Cartel 01 Do Crime Organizado 📊💰</h3>
    `;

    const copiarBotao = document.getElementById("copiarLista");
    copiarBotao.style.display = "block";
    copiarBotao.onclick = () => {
        const textoLista = listaOrdenada.map((item) => item.texto).join("\n");
        navigator.clipboard.writeText(`💰📊 HORÁRIOS DE ROUBOS Cartel DusCrime 📊💰\n\n${textoLista}\n\n💰📊 Cartel 01 Do Crime Organizado 📊💰`);
        alert("Lista copiada para a área de transferência!");
    };
});