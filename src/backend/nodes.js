const speachNodes = {
    Приветствие: {
      child: [
        "Нет интернета",
        "Низкая скорость",
        "Уточнить номер договора",
        "Уточнить время заявки",
        "Частые пропадания"
      ],
      text: "Здравствуйте это компания Feonet, оператор _____ чем могу помочь",
      type: 1
    },
    "Узнать адресc": {
      child: ["Сообщить номер договора"],
      text: "Назвоите пожалуйства свой полный адрес",
      type: 1
    }
  };
  
  const factNodes = {
    "Нет интернета": {
      child: ["Нет сессии", "IPoE абонент", "PPPoE абонент"],
      text: "",
      type: 2
    },
    "Нет сессии": {
      child: ["Частые пропадания", "Отменить заявку"],
      text: "",
      type: 2
    },
    "IPoE абонент": { child: [], text: "", type: 2 },
    "PPPoE абонент": { child: [], text: "", type: 2 },
    "GPON абонент": { child: [], text: "", type: 2 },
    "Подключен оптикой": { child: [], text: "", type: 2 },
    "Недостаточно средств": { child: [], text: "", type: 2 },
    "Есть сессия": { child: [], text: "", type: 2 },
    "Подключен к wifi": { child: [], text: "", type: 2 },
    "Уточнить номер договора": { child: ["Узнать адресc"], text: "", type: 2 },
    "Низкая скорость": { child: [], text: "", type: 2 },
    "Частые пропадания": { child: [], text: "", type: 2 },
    "Уточнить время заявки": { child: [], text: "", type: 2 },
    "Отменить заявку": { child: [], text: "", type: 2 }
  };
  
  const actNodes = {
    "Заявка на ближайшее время": { child: [], text: "", type: 3 },
    "Перезагрузить роутер": { child: [], text: "", type: 3 },
    "Обновить сессию": { child: [], text: "", type: 3 },
    "Сообщить номер договора": { child: [], text: "", type: 3 }
  };
  
  const allNodes = { ...speachNodes, ...actNodes, ...factNodes };
  
  export default allNodes;
  