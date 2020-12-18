
const speachNodes = {
    "Приветствие":{"child": ["Нет интернета", "Низкая скорость", "Уточнить номер договора", "Уточнить время заявки",
                             "Частые пропадания"], 
                    "text": "Здравствуйте это компания Feonet, оператор _____ чем могу помочь"}
    }


const actNodes={
    "Заявка на ближайшее время":{"text":""},
    "Перезагрузить роутер":{"text":""},
    "Обновить сессию":{"text":""},
}

const factNodes = {
    "Нет интернета":{"child":["Нет сессии", "IPoE абонент", "PPPoE абонент", "GPON абонент", "Недостаточно средств"], 
                    "text":""},
    
    "Нет сессии":{"text": ""},
    "IPoE абонент":{"text":""},
    "PPPoE абонент":{"text":""},
    "GPON абонент":{"text":""},
    "Подключен оптикой":{"text":""},
    "Недостаточно средств":{"text":""},
    
    "Есть сессия":{"text": ""},
    "Подключен к wifi":{"text":""},

    "Уточнить номер договора":{"text":""},
    
    "Низкая скорость":{"text":""},
    "Частые пропадания":{"text":""},
    "Уточнить время заявки":{"text":""},
    "Отменить заявку":{"text":""},
}

const allNodes = {...speachNodes, ...actNodes, ...factNodes}

export default allNodes