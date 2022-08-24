import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <div className='w-full h-screen bg-pink-100 flex flex-col justify-start items-center'>
      <h1 className="text-6xl my-12">
        分身懶人包
      </h1>
      <ul className='w-4/5 border border-gray-300 rounded bg-slate-50'>
        {
          descriptions().map((data, index) => {
            return(
              <li className='p-4 border-b border-gray-300 last:border-0 hover:bg-slate-200 flex' key={index} >
                <input type='checkbox' onClick={toggleCheckbox} />
                {
                  !data.link && <span className='ml-4'>{ data.description }</span>
                }
                {
                  data.link  && <a className='ml-4 underline underline-offset-8' href={data.link}>{ data.description }</a>
                }
                {
                  (data.hint || data.hintImg) &&
                  <div className='ml-4 cursor-pointer	relative w-1/2 group'>
                    <FontAwesomeIcon icon={faCircleInfo} className='z-10' />
                    <div className="absolute hidden group-hover:block border border-gray-300 rounded bg-white py-2 px-4 z-20">
                      {
                        data.hint &&
                        <span dangerouslySetInnerHTML={{ __html: data.hint }}></span>
                      }
                      {
                        data.hintImg &&
                        <img src={data.hintImg} />
                      }
                    </div>
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

const toggleCheckbox = el => { el.target.nextSibling.classList.toggle('line-through') }
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
      description: "【楓之谷聯盟戰地與傳授】V244 角色卡+傳授技能表格 來源/巴哈",
      link: 'https://forum.gamer.com.tw/C.php?bsn=7650&snA=1005772',
      hint: null,
      hintImg: null
    },
  ]
}