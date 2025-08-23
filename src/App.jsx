import { useState, useEffect } from 'react'
import Star from './components/Star'
import Modal from './components/Modal'
import SecretStar from './components/SecretStar'
import './App.css'

function App() {
  const [activeNote, setActiveNote] = useState(null)
  const [clickedStars, setClickedStars] = useState(new Set())
  const [showSecretStar, setShowSecretStar] = useState(false)

  const starData = [
    {
      id: 1,
      x: 20,
      y: 30,
      size: 3,
      content: {
        type: 'note',
        text: '🌟Со дня нашего знакомства мы обменялись 230 618 сообщениями. В это году сообщений было больше почти на 38 тысяч, чем в прошлом – 134 301. Мы ушли в плюс на 39%! Надеюсь, ты ещё любишь цифры ;)🌟'
      }
    },
    {
      id: 2,
      x: 80,
      y: 60,
      size: 2,
      content: {
        type: 'quiz',
        question: 'Когда мы впервые установили парные аватарки на основных аккаунтах?',
        questionImage: 'https://i.ibb.co/j93tv11L/pfp3.png',
        options: [
          { id: 1, text: 'Август 2024', correct: false, reaction: 'Не совсем, но тепло 😋' },
          { id: 2, text: 'Сентябрь 2024', correct: true, reaction: 'А ещё в то же время мы установили мой любимый статус – "I\'m so glad you\'re my partner in crime / As long as you\'re my partner in time"'},
          { id: 3, text: 'Июнь 2024', correct: false, reaction: 'Холодно пиздец 😵' },
          { id: 4, text: 'Ноябрь 2024', correct: false, reaction: 'Прохладно...' }
        ]
      }
    },
    {
      id: 3,
      x: 40,
      y: 80,
      size: 4,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/GfZJ9XrF/bts1.png',
          'https://i.ibb.co/7NbM7kps/bts2.png',
          'https://i.ibb.co/fVSZwm9G/bts3.png'
        ],
        caption: 'Beyond Two Souls нельзя назвать нашим первым совместным интерактивным кино, но я определённо его запомню, даже не смотря на эту мерзопакостную жилетку Райана в конце. Спасибо, что давала мне победокурить <3'
      }
    },
    {
      id: 4,
      x: 80,
      y: 20,
      size: 3,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/1GbxqQcm/lm1.png',          
          'https://i.ibb.co/0RWGTYLh/lm2.png',
          'https://i.ibb.co/5tLJ6QT/lm3.png',
          'https://i.ibb.co/676X5VzT/lm4.png',
          'https://i.ibb.co/0jhSc5cQ/lm5.png',
          'https://i.ibb.co/5XJP2Vy0/lm6.png',
          'https://i.ibb.co/BH1T7trB/lm7.png'
        ],
        caption: 'Ода, тот самый фильм, который побудил тебя почитать про тамплиеров. Спасибо, что показала его мне. Мне нравится с тобой смотреть подобные картины, а потом обсуждать их с тобой. Твоя точка зрения всегда интересна и важна мне, милая 💞'
      }
    },
    {
      id: 5,
      x: 70,
      y: 20,
      size: 2,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/cSWFYbhv/itt1.png',
          'https://i.ibb.co/XkGqyqsW/itt2.png',
          'https://i.ibb.co/Xrn6Brc0/itt3.png',
          'https://i.ibb.co/qPq6fL3/itt4.png',
          'https://i.ibb.co/9k0xc5rM/itt5.png',
          'https://i.ibb.co/234XNdqc/itt11.jpg',
          'https://i.ibb.co/pvwNNmWb/itt6.png',
          'https://i.ibb.co/G3N44rrW/itt7.png',
          'https://i.ibb.co/HLM9LHsR/itt8.png',
          'https://i.ibb.co/hR794Q9X/itt9.jpg'
        ],
        caption: "Наверное, эта одна из лучших игр, что мы когда-либо проходили вместе. Это одно из моих самых приятных воспоминаний, связанных с тобой, потому что я помню, как у меня болели щёки от улыбки, с каким азартом мы соревновались в минииграх и с каким восторгом мы погружались в эту сказочную атмосферу. Спасибо тебе за это 🫂"
      }
    },
    {
      id: 6,
      x: 10,
      y: 40,
      size: 2,
      content: {
        type: 'audio',
        audioFile: '/anniversary_gift/back to friends.mp3',
        title: 'Back To Friends - Sombr',
        description: 'Мне хотелось запечатать этот трек в этой своего рода капсуле воспоминаний. Она стоит того, чтобы её помнить и ассоциировать с тобой 💌'
      }
    },
        {
      id: 7,
      x: 50,
      y: 90,
      size: 3,
      content: {
        type: 'audio',
        audioFile: '/anniversary_gift/compass.mp3',
        title: 'Compass - The Neighbourhood',
        description: 'Я не могла не добавить эту песню сюда. Каждый раз, слушая её, я вспоминаю тебя и твой прекрасный вкус в музыке. You\'re my only compass 💝'
      }
    },
    {
      id: 8,
      x: 46,
      y: 10,
      size: 3,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/3ZkQF34/awo2.png',
          'https://i.ibb.co/R4HRB5XH/awo3.png',
          'https://i.ibb.co/vvjqNdgc/awo4.png',
          'https://i.ibb.co/DgpRTWmT/awo5.png',
          'https://i.ibb.co/Wv4gCXdc/awo6.png',
          'https://i.ibb.co/cMVrKHG/awo1.png',
        ],
        caption: 'А это моя самая любимая игра в нашем послужном списке. Я до сих пор с теплотой вспоминаю, как мы проходили эту сюжетку, веселились во время побега, плескались в пруду, шутили про кэйлюков заключённых, а потом плакали от концовки. Спасибо, что подарила мне эти воспоминания'
      }
    },
    {
      id: 9,
      x: 14,
      y: 73,
      size: 3,
      content: {
        type: 'memory',
        images: [
          '/https://i.ibb.co/QhrRZcH/bs1.jpg',
          'https://i.ibb.co/Mykjf28m/bs2.jpg',
          'https://i.ibb.co/mVwRmmWt/bs4.jpg',
          'https://i.ibb.co/hRL2MMGr/bs3.png'
        ],
        caption: 'Чуть-чуть понаглею и добавлю своё яркое воспоминание. Пусть мы и не слишком часто их обсуждаем, я всё ещё рада, что ты смотришь эти выпуски со мной. Первым делом, когда я вижу новую серию, я всегда бегу сообщать тебе ☺️'
      }
    },
    {
      id: 10,
      x: 60,
      y: 73,
      size: 2,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/2Y1hs7tV/p1.jpg',
          'https://i.ibb.co/HTb94VSg/p2.jpg',
          'https://i.ibb.co/QvSCJ6v8/p3.jpg',
          'https://i.ibb.co/N6fVGdw5/p4.png',
          'https://i.ibb.co/93zKGc7g/p6.jpg',
          'https://i.ibb.co/yFkcyTZk/p5.png',
          'https://i.ibb.co/4RSVshxC/p10.jpg',
          'https://i.ibb.co/KpjKgbpd/p11.jpg',
          'https://i.ibb.co/Txs3ksjk/p7.jpg',
          'https://i.ibb.co/1JnR5vV8/p8.jpg',
          'https://i.ibb.co/rGKTs090/p9.jpg'
        ],
        caption: 'Я, конечно же, не могла забыть про пик. Я умру с дуделкой в руках и с тобой в сердце, бро'
      }
    },
    {
      id: 11,
      x: 8,
      y: 24,
      size: 1.5,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/HD7rTDxf/rnd1.png'
        ]
      }
    },
    {
      id: 12,
      x: 87,
      y: 89,
      size: 1,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/pqLrv7m/rnd2.png'
        ]
      }
    },
    {
      id: 13,
      x: 95,
      y: 30,
      size: 2,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/mrqjMp7G/u1.png',
          'https://i.ibb.co/NgvJ01N8/u2.png',
          'https://i.ibb.co/sBhhhwk/u3.png'
        ],
        caption: 'Нет слов, брат, мы немощи'
      }
    },
    {
      id: 14,
      x: 24,
      y: 50,
      size: 1.5,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/wFYhh6H4/arc1.png',
          'https://i.ibb.co/gZQGcPCs/arc2.png',
          'https://i.ibb.co/RGsPD3t0/arc3.png',
          'https://i.ibb.co/m5qbtzNS/arc4.jpg',
          'https://i.ibb.co/G4DfV62T/arc6.jpg',
          'https://i.ibb.co/CpYxsKMg/arc5.jpg'
        ],
        caption: 'Хотя мы и посмотрели первый сезон раздельно, это не помешало мне насладиться нашим совместным просмотром второго сезона Аркейна. Спасибо, что познакомила меня с этим фандомом, дорогая. Джейвики канон 🥳'
      }
    },
    {
      id: 15,
      x: 10,
      y: 90,
      size: 2,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/Gfn0dq2S/hb4.jpg',
          'https://i.ibb.co/xqPkyCm6/hb1.png',
          'https://i.ibb.co/jcCf8p2/hb2.png',
          'https://i.ibb.co/SXjcJby0/hb3.png',
          'https://i.ibb.co/HTtLfr5Y/hb5.jpg'
        ],
        caption: 'Ура рыба (АКА самый креативный фандом в котором мы состоим и самый токсичный шип в нашем послужном списке. После этого сериала фраза "Я тебя съем" приобретает новый смысл)'
      }
    },
    {
      id: 16,
      x: 56,
      y: 28,
      size: 1,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/7NgpcTp6/trend1.jpg',
          'https://i.ibb.co/sJw7mf6y/trend2.jpg',
          'https://i.ibb.co/j9Z7tw0V/trend3.jpg',
          'https://i.ibb.co/TxFZNrBQ/trend4.jpg',
          'https://i.ibb.co/sdWhx7mg/trend5.jpg',
          'https://i.ibb.co/JFB2MWSW/trend6.jpg',
          'https://i.ibb.co/wZj47D6x/trend7.jpg',
          'https://i.ibb.co/qFmkbghP/trend8.jpg',
          'https://i.ibb.co/DHfXDq9H/trend9.jpg',
          'https://i.ibb.co/3Lfd0FY/trend10.jpg'
        ],
        caption: 'Первый тренд на твоём канале с моим участием. Прошёл уже год, а время пролетело как один день 😵‍💫'
      }
    },
    {
      id: 17,
      x: 73,
      y: 75,
      size: 3,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/60bgg0NR/ff1.jpg'
        ],
        caption: 'Ночное рандеву помнеш? Хоть у меня с писательством и не шибко срослось и свои работы я считаю не самыми лучшими... Без тебя и тех работ бы никогда не случилось. Я безмерно благодарна тебе за терпение, поддержку и помощь, в которой я нуждалась. Спасибо, лучик 🌟'
      }
    },
    {
      id: 18,
      x: 89,
      y: 50,
      size: 2,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/GQSdM8dn/sf1.jpg',
          'https://i.ibb.co/MxWk0xkR/sf2.jpg',
          'https://i.ibb.co/KjZ2x3Cq/sf3.jpg',
          'https://i.ibb.co/60JTz5xG/sf5.jpg',
          'https://i.ibb.co/1J75FN4K/sf4.jpg',
          'https://i.ibb.co/DHKSHhqt/sf7.jpg',
          'https://i.ibb.co/rGjwFRH3/sf6.png'
        ],
        caption: 'Сплит Фикшн, который мы ждали с момента прохождения It Takes 2. Хоть мы и были расстроены отсутствием миниигр, игра оставила по себе приятные воспоминания. Атмосфера сказки и футуристического романа, бои с плёткой и вселение в зверей – всё это, безусловно, весело, но знаешь, что делает эту игру по настоящему особенной? Прохождение с тобой. Спасибо за это воспоминание, солнце'
      }
    },
    {
      id: 19,
      x: 14,
      y: 13,
      size: 2,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/dsXRV89n/hk1.jpg',
          'https://i.ibb.co/dJxzzpBn/hk2.jpg',
          'https://i.ibb.co/N27mhz68/hk3.jpg'
        ],
        caption: 'Наша совместная травма и поставщик стекла. Я рада, что ты мне показала это аниме и каждый раз ждала, чтобы посмотреть со мной новую серию. Глянем продолжение сегодня? ;)'
      }
    },
    {
      id: 20,
      x: 87,
      y: 8,
      size: 2,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/4Zs2Fbdn/dos1.jpg',
          'https://i.ibb.co/SX6Dk7K6/dos2.jpg',
          'https://i.ibb.co/GfXmbSgv/dos3.jpg'
        ],
        caption: 'Я рада, что ты согласилась со мной поиграть в дивинити, хоть это и был новый жанр для тебя. Я всё ещё думаю, что наши персонажи хорошо смотряться вместе. Когда-нибудь мы обязательно пойдём во второй акт'
      }
    },
    {
      id: 21,
      x: 7,
      y: 60,
      size: 3,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/QFBZXgh1/kl1.jpg',
          'https://i.ibb.co/215g8Xb0/kl2.png',
          'https://i.ibb.co/1GLHQ87F/kl4.jpg'
        ],
        caption: 'Спасибо, что показала мне вольтрона и этих двоих. Смотреть с тобой этот мультсериал было действительно весело и я ценю каждую нашу минутку вместе. Китлэнсы канон'
      }
    },
    {
      id: 22,
      x: 76,
      y: 34,
      size: 2,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/b9fWBWy/raft1.png',
          'https://i.ibb.co/8LPgznMm/raft4.png',
          'https://i.ibb.co/1k0qGch/raft3.png',
          'https://i.ibb.co/Z6BbvdSL/raft2.jpg'
        ],
        caption: 'Лучшая выживалка, где было всё – и убийства, и расследования, и интриги'
      }
    },
    {
      id: 23,
      x: 45,
      y: 23,
      size: 2,
      content: {
        type: 'memory',
        images: [
          'https://i.ibb.co/7d0HTH8P/repo1.jpg',
          'https://i.ibb.co/VYBPwJsR/repo2.jpg',
          'https://i.ibb.co/V5cScTX/repo3.jpg',
          'https://i.ibb.co/TxfdQGpm/repo4.jpg'
        ],
        caption: 'Источник наших лучших хихишек и седых волос. Каждая игра с тобой для меня особенна, спасибо, что находишь время на дурачество со мной'
      }
    },
  ]

  const secretStarContent = {
    type: 'secret',
    text: 'Самая яркая моя звезда – это ты 💫',
    subtext: 'Не смотря на все разногласия и трудности ты осталась рядом и я по прежнем имею радость общаться с тобой каждый день. Благодаря тебе этот год запомнился мне хорошим и я буду с радостью возвращаться к нашим общим воспоминаниям и в будущем. Спасибо тебе за то, что ты есть в моей жизни✨',
    image: 'https://media.tenor.com/x8v1oNUOmg4AAAAM/rickroll-roll.gif'
  }

  useEffect(() => {
    if (clickedStars.size === starData.length && !showSecretStar) {
      setShowSecretStar(true)
    }
  }, [clickedStars, showSecretStar])

  const handleStarClick = (content, starId) => {
    setActiveNote(content)
    
    setClickedStars(prev => {
      const newSet = new Set(prev)
      newSet.add(starId)
      return newSet
    })
  }

  const closeModal = () => {
    setActiveNote(null)
  }

  const handleSecretStarClick = () => {
    setActiveNote(secretStarContent)
  }

  return (
    <div className="app">
      <div className="star-background">
        <div className="constellations"></div>
        
        {starData.map(star => (
          <Star
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            size={star.size}
            content={star.content}
            onClick={handleStarClick}
            isClicked={clickedStars.has(star.id)}
          />
        ))}
        
        {showSecretStar && (
          <SecretStar onClick={handleSecretStarClick} />
        )}
      </div>
      
      {activeNote && (
        <Modal content={activeNote} onClose={closeModal} />
      )}

      <div className="title">
        <h1>2 Года Вместе!</h1>
        <p>Зажги звезды ✨</p>
        {clickedStars.size > 0 && (
          <div className="progress">
            Зажжённые звёзды: {clickedStars.size} / {starData.length}
          </div>
        )}
      </div>
    </div>
  )
}

export default App