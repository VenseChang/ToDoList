import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className='w-full h-screen bg-pink-100 flex flex-col justify-start items-center'>
      <h1 className="text-6xl my-12">
        分身懶人包
      </h1>
      <ul className='w-4/5 border border-gray-300 rounded bg-slate-50'>
        <li className="p-4 border-b border-gray-300 last:border-0 hover:bg-slate-200 flex flex-col">         
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:w-1/6 flex justify-center items-center text-sm">加倍提醒 (分鐘)</div>
            <input id='timer' type='number' className='md:w-2/3 my-2 md:my-0 md:ml-2 py-2 border border-gray-300 rounded px-2' defaultValue={30} placeholder='單位：分鐘'/>
            <button id='timerStart' onClick={setTimer} className='md:w-1/6 my-2 md:my-0 md:ml-2 py-2 px-4 border border-green-600 rounded text-green-600 font-bold hover:bg-green-600 hover:text-white'>start</button>
            <button id='timerStop'  onClick={clearTimer} className='hidden md:w-1/6 my-2 md:my-0 md:ml-2 py-2 px-4 border border-red-600 rounded text-red-600 font-bold hover:bg-red-600 hover:text-white'>stop</button>
          </div>
          <button onClick={resetListStatus} className="mt-2 py-2 px-4 border border-gray-600 rounded"> 重置清單 </button>
        </li>
        {
          descriptions().map((data, index) => {
            return(
              <li className='border-b border-gray-300 last:border-0 hover:bg-slate-200 cursor-pointer' onClick={toggleDetail} key={index} >
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <input type='checkbox' onClick={toggleCheckbox} />
                    {
                      !data.link && <span className='ml-4'>{ data.description }</span>
                    }
                    {
                      data.link  && <a className='ml-4 underline underline-offset-8' href={data.link}>{ data.description }</a>
                    }
                  </div>
                  {
                    (data.hint || data.hintImg) && <FontAwesomeIcon icon={faAngleRight} />
                  }
                </div>
                {
                  (data.hint || data.hintImg) &&
                  <div name='detail' className="mx-4 py-4 border-t border-gray-300 hidden">
                    {
                      data.hint &&
                      <span dangerouslySetInnerHTML={{ __html: data.hint }}></span>
                    }
                    {
                      data.hintImg &&
                      <img src={data.hintImg} />
                    }
                  </div>
                }
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

let intervalId;

const resetListStatus = el => {
  let ulTag = el.target.closest('ul')
  ulTag.querySelectorAll('li').forEach(liTag => {
    let input = liTag.querySelector('input[type="checkbox"]')
    if(input?.checked) {
      input.checked = !input.checked
      input.nextSibling.classList.toggle('line-through') 
      input.nextSibling.classList.toggle('text-gray-400') 
    }

    let detail = liTag.querySelector('div[name="detail"]')
    if(detail && !detail.classList.contains('hidden')) {
      detail.classList.toggle('hidden')
      liTag.querySelector('svg').classList.toggle('rotate-90')
    }
  })
}

const clearTimer = () => { 
  clearInterval(intervalId)
  toggerTimer()
}

const setTimer = () => {
  if (!('Notification' in window)) { console.log('This browser does not support notification'); }
  
  if (Notification.permission === 'default' || Notification.permission === 'undefined') {
    Notification.requestPermission(() => { notify() });
  } 
  
  if (Notification.permission === 'granted') notify()
}

const notify = () => {
  if(!!intervalId) return

  let mins = parseInt(timer.value)
  const notifyConfig = {
    body: `${mins} 分鐘已到，記得喝藥水喔！`, // 設定內容
    icon: 'https://imgur.com/4g53mvW.png',
  };

  intervalId = setInterval(() => {
    new Notification('加倍藥水使用提醒!', notifyConfig)
  }, (mins * 60 * 1000))

  toggerTimer()
}

const toggerTimer = () => {
  timerStart.classList.toggle('hidden')
  timerStop.classList.toggle('hidden')
}

const toggleCheckbox = el => { 
  el.target.nextSibling.classList.toggle('line-through') 
  el.target.nextSibling.classList.toggle('text-gray-400') 
}

const toggleDetail = el => {
  if(el.target.type === 'checkbox') return

  let liTag = el.target
  if(liTag.tagName !== 'li') { liTag = liTag.closest('li') }
  
  let detail = liTag.querySelector('div[name="detail"]')
  if(!detail) return
  detail.classList.toggle('hidden')

  let svg = liTag.querySelector('svg')
  svg.classList.toggle('rotate-90')
}

const descriptions = () => {
  return [
    {
      description: "倉庫拿茁壯幼苗、經驗加倍券、經驗藥水",
      link: null,
      hint: null,
      hintImg: 'https://imgur.com/SN2uaDt.png'
    },
    {
      description: "買幼苗藥水、寵物飼料",
      link: null,
      hint: "重點:練完請把茁壯幼苗、寵物放回倉庫、商城",
      hintImg: null
    },
    {
      description: "練等時，請記得喝 背包裡的藥水們",
      link: null,
      hint: null,
      hintImg: null
    },
    {
      description: "傳授技能",
      link: null,
      hint: null,
      hintImg: 'https://imgur.com/KNE7yv1.png'
    },
    {
      description: "戰地調整",
      link: null,
      hint: "左上角就是根據你練的職業 「<span class='font-bold text-red-300'>物攻</span>、<span class='font-bold text-blue-300'>魔攻</span>去改」<br>右邊的區域就是改他的主屬<br>所以左邊那塊填滿的區域不是「<span class='font-bold text-red-300'>攻擊力</span>」就是「<span class='font-bold text-blue-300'>魔力</span>」<br>右邊那區就是 STR DEX INT LUK 其中一個",
      hintImg: 'https://imgur.com/sgYk8k6.png'
    },
    {
      description: "4慧 的楓之谷聯盟戰地與傳授",
      link: 'https://docs.google.com/spreadsheets/d/1yotHCTHQUEpshhK6mr7jIW7R98l_-hEopJ4SlGu2ca8/edit?usp=sharing',
      hint: null,
      hintImg: null
    },
  ]
}