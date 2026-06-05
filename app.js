const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");

const megaMenuData = {
  首页: {
    kicker: "XHALO OVERVIEW",
    title: "兴火通讯官网导览",
    columns: [
      { heading: "品牌首页", items: ["重点新闻", "企业定位", "核心业务"] },
      { heading: "重点专题", items: ["AI Native Network", "绿色低碳网络", "云网融合"] },
      { heading: "快速入口", items: ["解决方案", "成交案例", "联系我们"] },
    ],
  },
  解决方案: {
    kicker: "SCENARIO SOLUTIONS",
    title: "面向运营商网络演进的方案组合",
    columns: [
      { heading: "网络演进", items: ["5G-A 城市融合网络", "云网融合承载", "全光城域"] },
      { heading: "行业场景", items: ["行业专网", "边缘算力", "园区网络"] },
      { heading: "运营效率", items: ["AI 智能运维", "绿色低碳网络", "体验保障"] },
    ],
  },
  产品中心: {
    kicker: "PRODUCT PORTFOLIO",
    title: "运营商业务产品导航",
    columns: [
      { heading: "无线接入", items: ["5G", "5G-A"], groups: [{ heading: "5G新业务", items: ["5G新通话"] }, { heading: "数据网络", items: ["优智 Flexhaul", "优智数据中心网络", "优智IP网络"] }] },
      { heading: "光网络", items: ["优智全光网", "全频OTN"], groups: [{ heading: "算力基础设施", items: ["AI Studio智算平台", "双引擎云平台", "资源管理", "分布式存储", "网络管理", "硬件加速", "AiCube智算一体机"] }] },
      { heading: "核心网", items: ["全融合核心网", "IMS/语音", "融合用户数据", "融合策略控制", "融合信令", "智能运维"], groups: [{ heading: "视频会议", items: ["智会屏"] }, { heading: "云电脑", items: [] }] },
      { heading: "数据库", items: ["GoldenDB", "银行核心系统", "证券核心系统", "运营商核心系统"], groups: [{ heading: "固定宽带", items: ["光联千家百业", "光纤接入", "企业全光网", "园区交换机", "家庭网络", "家庭DICT"] }] },
      { heading: "服务与数智化平台", items: ["智能运维", "数字化运营", "数智中台", "5G服务", "端到端网络服务"], groups: [{ heading: "数字能源", items: ["数据中心", "新能源", "通信能源"] }] },
      { heading: "视频业务", items: ["家庭媒体中心", "AI大视频解决方案"], groups: [{ heading: "服务器与存储", items: ["服务器", "存储"] }] },
    ],
  },
  新闻动态: {
    kicker: "新闻动态",
    title: "展会动态与技术洞察",
    columns: [
      { heading: "公司动态", items: ["展会发布", "生态合作", "方案联调"] },
      { heading: "技术观察", items: ["5G-A", "AI 运维", "低碳网络"] },
      { heading: "资料中心", items: ["演示材料", "方案摘要", "新闻稿"] },
    ],
  },
  联系我们: {
    kicker: "CONTACT",
    title: "展会联络与商务咨询",
    columns: [
      { heading: "展会联络", items: ["商务咨询", "展位信息", "演示预约"] },
      { heading: "资料获取", items: ["方案手册", "产品清单", "新闻资料"] },
      { heading: "合规说明", items: ["模拟展示用途", "非真实经营主体", "模拟联系信息"] },
    ],
  },
};

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function renderMegaColumn(column) {
  const primaryItems = column.items.map((item) => `<li>${item}</li>`).join("");
  const groups = (column.groups || [])
    .map((group) => {
      const groupItems = group.items.length
        ? group.items.map((item) => `<li>${item}</li>`).join("")
        : `<li class="muted-item">规划中</li>`;
      return `<div class="mega-subgroup"><h4>${group.heading}</h4><ul>${groupItems}</ul></div>`;
    })
    .join("");

  return `
    <section class="mega-column">
      <h3>${column.heading}</h3>
      <ul>${primaryItems}</ul>
      ${groups}
    </section>
  `;
}

if (siteHeader && siteNav) {
  const megaMenu = document.createElement("div");
  megaMenu.className = "mega-menu";
  megaMenu.setAttribute("role", "region");
  megaMenu.setAttribute("aria-label", "导航内容");
  siteHeader.appendChild(megaMenu);

  const navLinks = [...siteNav.querySelectorAll("a")];
  let closeTimer;

  const showMegaMenu = (label) => {
    const data = megaMenuData[label];
    if (!data || window.matchMedia("(max-width: 900px)").matches) {
      return;
    }
    window.clearTimeout(closeTimer);
    megaMenu.innerHTML = `
      <div class="mega-panel">
        <aside class="mega-lead">
          <p class="eyebrow">${data.kicker}</p>
          <h2>${data.title}</h2>
          <p>快速浏览兴火通讯的业务线、方案入口与展示内容。</p>
        </aside>
        <div class="mega-grid">${data.columns.map(renderMegaColumn).join("")}</div>
      </div>
    `;
    megaMenu.classList.add("is-open");
  };

  const scheduleClose = () => {
    closeTimer = window.setTimeout(() => {
      megaMenu.classList.remove("is-open");
    }, 140);
  };

  navLinks.forEach((link) => {
    const label = link.textContent.trim();
    link.addEventListener("mouseenter", () => showMegaMenu(label));
    link.addEventListener("focus", () => showMegaMenu(label));
  });

  siteHeader.addEventListener("mouseleave", scheduleClose);
  siteHeader.addEventListener("mouseenter", () => window.clearTimeout(closeTimer));
  megaMenu.addEventListener("mouseenter", () => window.clearTimeout(closeTimer));
  megaMenu.addEventListener("mouseleave", scheduleClose);
}

const newsCarousel = document.querySelector(".news-hero-carousel");

if (newsCarousel) {
  const track = newsCarousel.querySelector(".news-hero-track");
  const slides = [...newsCarousel.querySelectorAll(".news-hero-slide")];
  const dots = [...newsCarousel.querySelectorAll(".news-hero-dots button")];
  let currentSlide = 0;
  let carouselTimer;

  const showSlide = (index) => {
    currentSlide = (index + slides.length) % slides.length;
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}vw)`;
    }
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentSlide;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", isActive ? "true" : "false");
    });
  };

  const startCarousel = () => {
    window.clearInterval(carouselTimer);
    carouselTimer = window.setInterval(() => showSlide(currentSlide + 1), 6000);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      startCarousel();
    });
  });

  newsCarousel.addEventListener("mouseenter", () => window.clearInterval(carouselTimer));
  newsCarousel.addEventListener("mouseleave", startCarousel);
  showSlide(0);
  startCarousel();
}

const demoForm = document.querySelector("#demoForm");

if (demoForm) {
  demoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = demoForm.querySelector(".form-note");
    if (note) {
      note.textContent = "已记录模拟咨询信息。正式上线后可接入真实表单服务。";
    }
    demoForm.reset();
  });
}
