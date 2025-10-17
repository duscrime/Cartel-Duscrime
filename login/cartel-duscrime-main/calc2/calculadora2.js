document.getElementById("calcular2").addEventListener("click", () => {
    const cofres = [
        { nome: "Cofre BPS", icone: "🌋", ganho: "R$214.000", horaId: "CofreBPSHora", restanteId: "CofreBPSRestante" },
        { nome: "Navio", icone: "🚢", ganho: "R$165.000", horaId: "NavioHora", restanteId: "NavioRestante" },
        { nome: "Ilha", icone: "🏝️", ganho: "R$218.000", horaId: "IlhaHora", restanteId: "IlhaRestante" },
        { nome: "Bar", icone: "🍺", ganho: "R$60.000", horaId: "BarHora", restanteId: "BarRestante" },
        { nome: "Loja de Armas 3", icone: "🔫", ganho: "R$60.000", horaId: "LojaDeArmasHora", restanteId: "LojaDeArmasRestante" },
        { nome: "Cassino", icone: "🎰", ganho: "R$100.000", horaId: "CassinoHora", restanteId: "CassinoRestante" },
        { nome: "Lotérica SF", icone: "💳", ganho: "R$60.000", horaId: "LotericaSFHora", restanteId: "LotericaSFRestante" },
        { nome: "Banco Central", icone: "🏛️", ganho: "R$219.000", horaId: "BancoCentralHora", restanteId: "BancoCentralRestante" }
    ];

    const horarios = cofres.map((cofre) => {
        const horaInput = document.getElementById(cofre.horaId).value;
        const restanteInput = document.getElementById(cofre.restanteId).value;

        if (!horaInput || !restanteInput) {
            return { texto: `${cofre.icone} ${cofre.nome}: SEM INFO | 💰 ${cofre.ganho}`, timestamp: Infinity };
        }

        const [hora, minuto] = horaInput.split(":").map(Number);
        const [restHora, restMin] = restanteInput.split(":").map(Number);

        const horarioFinal = new Date();
        horarioFinal.setHours(hora, minuto);
        horarioFinal.setMinutes(horarioFinal.getMinutes() + restHora * 60 + restMin);

        const horarioFormatado = horarioFinal.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        return { texto: `${cofre.icone} ${cofre.nome}: ${horarioFormatado} | 💰 ${cofre.ganho}`, timestamp: horarioFinal.getTime() };
    });

    const listaOrdenada = horarios.sort((a, b) => a.timestamp - b.timestamp);

    const resultadoDiv = document.getElementById("resultado2");
    resultadoDiv.innerHTML = `
        <h3>💰📊 HORÁRIOS DE ROUBOS Cartel DusCrime 📊💰</h3>
        <ul>${listaOrdenada.map((item) => `<li>${item.texto}</li>`).join("")}</ul>
        <h3>💰📊 Cartel 01 Do Crime Organizado 📊💰</h3>
    `;

    const copiarBotao = document.getElementById("copiarLista2");
    copiarBotao.style.display = "block";
    copiarBotao.onclick = () => {
        const textoLista = listaOrdenada.map((item) => item.texto).join("\n");
        navigator.clipboard.writeText(`💰📊 HORÁRIOS DE ROUBOS Cartel DusCrime 📊💰\n\n${textoLista}\n\n💰📊 Cartel 01 Do Crime Organizado 📊💰`);
        alert("Lista copiada para a área de transferência!");
    };
});