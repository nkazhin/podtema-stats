export default function handler(req, res) {
  const {
    episodes = '24',
    weeklyEpisodes = '5',
    listenTime = '1440',
    readTime = '360',
    specialty = 'Дерматология'
  } = req.query;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}ч ${mins}м`;
  };

  const timeSaved = parseInt(listenTime) - parseInt(readTime);

  const svg = `
    <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
        </linearGradient>
      </defs>
      
      <!-- Background -->
      <rect width="600" height="400" rx="15" fill="url(#grad)"/>
      
      <!-- Title -->
      <text x="300" y="50" fill="white" font-size="24" font-weight="bold" text-anchor="middle">
        Ваша статистика
      </text>
      <text x="300" y="80" fill="#93C5FD" font-size="16" text-anchor="middle">
        Пробный период
      </text>

      <!-- Episodes -->
      <text x="50" y="140" fill="white" font-size="18">
        📚 ${episodes} эпизодов получено
      </text>
      <text x="70" y="165" fill="#93C5FD" font-size="14">
        За последние 7 дней: ${weeklyEpisodes}
      </text>

      <!-- Time -->
      <text x="50" y="220" fill="white" font-size="18">
        ⏱ ${formatTime(parseInt(listenTime))} → ${formatTime(parseInt(readTime))}
      </text>
      <text x="70" y="245" fill="#93C5FD" font-size="14">
        Время прослушивания → Время чтения
      </text>

      <!-- Time Saved -->
      <text x="50" y="300" fill="white" font-size="18">
        ✨ ${formatTime(timeSaved)} сэкономлено
      </text>
      <text x="70" y="325" fill="#93C5FD" font-size="14">
        Ваше сохранённое время
      </text>

      <!-- Footer -->
      <text x="300" y="370" fill="#93C5FD" font-size="14" text-anchor="middle">
        Хотите продолжить экономить время?
      </text>
    </svg>
  `;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  res.status(200).send(svg);
}