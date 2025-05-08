const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      //控制leftSideBar開合
      // 按鈕顏色
      isHovered: false,
      btnStyle: "background-color: #a47764;border-color: #a47764;color: white;",
      btnHoverStyle:
        "background-color: #8b645a;border-color: #8b645a;color: white;font-weight: bold;",
        // :style="isHovered ? btnHoverStyle : btnStyle"
        // @mouseover="isHovered = true"
        // @mouseleave="isHovered = false"

      // 開合開關
      MenuBarCollapsed: true,
      hovered: false,
      showSchedulePanel: false,
      showMenuBar: false,
      showProducts: false,
      sortByWhat: "評價",
      isFavoriteIcon: true,
      moveToMap: false,

      //行程詳細相關
      ShowThisScheduleDetail: false,
      tripDaysTabs: [],
      activeTab: "overview",
      tripKey: "",

      colors: [
        // "color: #f0f0e5",
        "color: #e4c7b8",
        "color: #bbaa92",
        "color: #c39e88",
        "color: #a47764",
        "color: #a28777",
        "color: #8b645a",
        "color: #56453f",
      ],
      testColors1: [
        // "background-color: #f0f0e5",
        "color: #e6194B",
        "color: #3cb44b",
        "color: #ffe119",
        "color: #4363d8",
        "color: #f58231",
        "color: #911eb4",
        "color:rgb(255, 197, 252)",
        "color: #9A6324",
        "color: #a9a9a9",
        "color:rgba(170, 104, 167, 0.45)",
      ],
      testColors: [
        "color: #D2B48C",
        "color: #8B4513",
        "color: #D2691E",
        "color: #800000",
        "color: #F0E68C",
        "color: #FFBF00",
        "color: #808000",
        "color: #C3B091",
        "color: #CC7722",
        "color: #ffe119",
      ],

      //視窗大小
      screenWidth: window.innerWidth,
      //下拉式選單選到的項目
      selectedOption: "recent_lastEdit",
      /* 熱門景點資料 */
      places: [
        {
          name: "北投溫泉博物館",
          rating: "4.5",
          reviews: "9.6K",
          trips: "2365",
          image: "https://picsum.photos/100/100?random=1",
          isFavorite: false,
        },
        {
          name: "臺北市立圖書館 北投分館臺北市立圖書館 北投分館臺北市立圖書館 北投分館臺北市立圖書館 北投分館臺北市立圖書館 北投分館臺北市立圖書館 北投分館",
          rating: "4.5",
          reviews: "2.9K",
          trips: "1214",
          image: "https://picsum.photos/100/100?random=2",
          isFavorite: true,
        },
        {
          name: "新北投車站",
          rating: "4.4",
          reviews: "4.9K",
          trips: "908",
          image: "https://picsum.photos/100/100?random=3",
          isFavorite: false,
        },
        {
          name: "北投溫泉博物館",
          rating: "4.5",
          reviews: "9.6K",
          trips: "2365",
          image: "https://picsum.photos/100/100?random=1",
          isFavorite: false,
        },
        {
          name: "臺北市立圖書館 北投分館臺北市立圖書館 北投分館臺北市立圖書館 北投分館臺北市立圖書館 北投分館臺北市立圖書館 北投分館臺北市立圖書館 北投分館",
          rating: "4.5",
          reviews: "2.9K",
          trips: "1214",
          image: "https://picsum.photos/100/100?random=2",
          isFavorite: true,
        },
        {
          name: "新北投車站",
          rating: "4.4",
          reviews: "4.9K",
          trips: "908",
          image: "https://picsum.photos/100/100?random=3",
          isFavorite: false,
        },
        {
          name: "北投溫泉博物館",
          rating: "4.5",
          reviews: "9.6K",
          trips: "2365",
          image: "https://picsum.photos/100/100?random=1",
          isFavorite: false,
        },
        {
          name: "臺北市立圖書館 北投分館臺北市立圖書館 北投分館臺北市立圖書館 北投分館臺北市立圖書館 北投分館臺北市立圖書館 北投分館臺北市立圖書館 北投分館",
          rating: "4.5",
          reviews: "2.9K",
          trips: "1214",
          image: "https://picsum.photos/100/100?random=2",
          isFavorite: true,
        },
        {
          name: "新北投車站",
          rating: "4.4",
          reviews: "4.9K",
          trips: "908",
          image: "https://picsum.photos/100/100?random=3",
          isFavorite: false,
        },
      ],
      /* 行程資料 */
      trips: [
        {
          // 猜測應該是要根據點擊時,取到一個Key之後去資料庫撈FK一樣的資料加進itinerary  primeKey:"trip1",目前應該沒用
          primeKey: "trip1",
          img: "https://picsum.photos/200/150?random=1",
          title: "到嘉義就是要吃！",
          firstDate: "2024/07/01",
          lastDate: "2024/07/13",
        },
        {
          primeKey: "trip2",
          img: "https://picsum.photos/200/150?random=2",
          title: "浪漫東京遊浪漫東京遊浪漫東京遊浪漫東京遊 🦊",
          firstDate: "2024/07/08",
          lastDate: "2024/07/11",
        },
        {
          primeKey: "trip3",
          img: "https://picsum.photos/200/150?random=4",
          title: "浪漫東京遊浪漫東京遊浪漫東京遊浪漫東京遊 🦊",
          firstDate: "2024/08/01",
          lastDate: "2024/08/03",
        },
        {
          primeKey: "trip4",
          img: "https://picsum.photos/200/150?random=1",
          title: "到嘉義就是要吃！",
          firstDate: "2024/07/01",
          lastDate: "2024/07/03",
        },
        {
          primeKey: "trip5",
          img: "https://picsum.photos/200/150?random=2",
          title: "浪漫東京遊浪漫東京遊浪漫東京遊浪漫東京遊 🦊",
          firstDate: "2024/07/08",
          lastDate: "2024/07/15",
        },
        {
          primeKey: "trip5",
          img: "https://picsum.photos/200/150?random=4",
          title: "浪漫東京遊浪漫東京遊浪漫東京遊浪漫東京遊 🦊",
          firstDate: "2024/08/01",
          lastDate: "2024/08/23",
        },
        {
          primeKey: "trip6",
          img: "https://picsum.photos/200/150?random=1",
          title: "到嘉義就是要吃！",
          firstDate: "2024/07/01",
          lastDate: "2024/07/03",
        },
        {
          primeKey: "trip7",
          img: "https://picsum.photos/200/150?random=2",
          title: "浪漫東京遊浪漫東京遊浪漫東京遊浪漫東京遊 🦊",
          firstDate: "2024/07/08",
          lastDate: "2024/07/15",
        },
        {
          primeKey: "trip8",
          img: "https://picsum.photos/200/150?random=4",
          title: "浪漫東京遊浪漫東京遊浪漫東京遊浪漫東京遊 🦊",
          firstDate: "2024/08/01",
          lastDate: "2024/08/23",
        },
        {
          primeKey: "trip9",
          img: "https://picsum.photos/200/150?random=1",
          title: "到嘉義就是要吃！",
          firstDate: "2024/07/01",
          lastDate: "2024/07/03",
        },
        {
          primeKey: "trip10",
          img: "https://picsum.photos/200/150?random=2",
          title: "浪漫東京遊浪漫東京遊浪漫東京遊浪漫東京遊 🦊",
          firstDate: "2024/07/08",
          lastDate: "2024/07/15",
        },
        {
          primeKey: "trip10",
          img: "https://picsum.photos/200/150?random=4",
          title: "浪漫東京遊浪漫東京遊浪漫東京遊浪漫東京遊 🦊",
          firstDate: "2024/08/01",
          lastDate: "2024/08/23",
        },
        {
          primeKey: "trip11",
          img: "https://picsum.photos/200/150?random=1",
          title: "到嘉義就是要吃！",
          firstDate: "2024/07/01",
          lastDate: "2024/07/03",
        },
      ],
      // 行程詳細資料
      itinerary: [
        {
          foreignKey: "trip1",
          day: "day1",
          time: "19:00",
          title:
            "機場出發機場出發機場出發機場出發機場出出發機場出發機場出出發機場出發機場出發",
          duration: "停留 1 小時 30 分鐘",
          image: "https://picsum.photos/80",
          note: "坐計程車,搭飛機~筆記本測試坐計程車,搭飛機~筆記本測試坐計程車,搭飛機~筆記本測試坐計程車,搭飛機~筆記本測試坐計程車,搭飛機~筆記本測試坐計程車,搭飛 機~筆記本測試坐計程車,搭飛機~筆記本測試 坐計程車,搭飛機~筆記本 測試坐 計程車,搭飛機~筆記本測試坐計程車,搭飛機~筆記本測試坐計程車,搭飛機~筆記本測試坐計程車,搭飛機~筆記本測試坐計程車,搭飛機~筆記本測試坐計程車,搭飛機~筆記本測試坐計程車,搭飛機~筆記本測試坐計程車,搭飛 機~筆記本測試坐計程車,搭飛機~筆記本測試 坐計程車,搭飛機~筆記本 測試坐 計程車,搭飛機~筆記本測試坐計程車,搭飛機~筆記本測試",
        },
        {
          foreignKey: "trip1",
          day: "day1",
          time: "09:00",
          title: "機場出發",
          duration: "停留 1 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day1",
          time: "09:00",
          title: "機場出發",
          duration: "停留 1 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day1",
          time: "09:00",
          title: "機場出發",
          duration: "停留 1 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day1",
          time: "09:00",
          title: "機場出發",
          duration: "停留 1 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day1",
          time: "09:00",
          title: "機場出發",
          duration: "停留 1 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day1",
          time: "09:00",
          title: "機場出發",
          duration: "停留 1 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day2",
          time: "10:00",
          title: "知名景點 A",
          duration: "停留 2 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day3",
          time: "14:00",
          title: "特色美食 B",
          duration: "停留 1.5 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day3",
          time: "10:00",
          title: "知名景點 A",
          duration: "停留 2 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day4",
          time: "11:30",
          title: "博物館 C",
          duration: "停留 2 小時",
          image: "https://picsum.photos/80",
        },

        {
          foreignKey: "trip1",
          day: "day6",
          time: "09:00",
          title: "機場出發",
          duration: "停留 1 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day7",
          time: "10:00",
          title: "知名景點 A",
          duration: "停留 2 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day8",
          time: "14:00",
          title: "特色美食 B",
          duration: "停留 1.5 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day9",

          time: "11:30",
          title: "博物館 C",
          duration: "停留 2 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip1",
          day: "day10",
          time: "16:00",
          title: "購物中心 D",
          duration: "停留 3 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip2",
          day: "day1",
          time: "14:00",
          title: "特色美食 B",
          duration: "停留 1.5 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip2",
          day: "day2",

          time: "11:30",
          title: "博物館 C",
          duration: "停留 2 小時",
          image: "https://picsum.photos/80",
        },
        {
          foreignKey: "trip2",
          day: "day1",
          time: "16:00",
          title: "購物中心 D",
          duration: "停留 3 小時",
          image: "https://picsum.photos/80",
        },
      ],
      // 篩選後的資料
      myItinerary: [],
    };
  },
  computed: {
    // 判斷螢幕是否 < 992
    isMobile() {
      return this.screenWidth < 992;
    },
    // 篩選顯示資料(行程詳細頁每日)
    filteredItinerary() {
      console.log(
        this.myItinerary.filter((item) => item.day === this.activeTab)
      );
      return this.activeTab === "overview"
        ? this.myItinerary
        : this.myItinerary.filter((item) => item.day === this.activeTab);
    },
    sortedItinerary() {
      return this.myItinerary.slice().sort((a, b) => {
        return a.time.localeCompare(b.time);
      });
    },
  },
  methods: {
    // 展開選單文字
    expandMenu() {
      this.MenuBarCollapsed = false;
    },
    //收起選單文字
    collapseMenu() {
      this.MenuBarCollapsed = true;
    },
    //展開行程表
    // showSchedule() {
    //   this.showSchedulePanel = !this.showSchedulePanel;
    // },
    showProductsBox() {
      this.showProducts = !this.showProducts;
    },

    //展開導覽NavBar
    showMenu() {
      this.showMenuBar = !this.showMenuBar;
    },
    //更新視窗大小
    updateScreenWidth() {
      this.screenWidth = window.innerWidth;
    },
    // 更新景點表排序條件顯示
    updateDropdown(item) {
      this.sortByWhat = item; // 更新按鈕的文字
    },
    //行程<->行程詳細
    moveToScheduleDetail(trip) {
      this.myItinerary = [];
      this.getTripDaysTab(trip);
      // 從itinerary篩選資料
      this.myItinerary = this.itinerary.filter(
        (item) => item.foreignKey === trip.primeKey
      );
      console.log(this.myItinerary);
      this.ShowThisScheduleDetail = true;
      this.tripKey = trip.primeKey;
    },
    // 計算行程天數
    getTripDaysTab(trip) {
      // const startDate = new Date("2024/08/01");
      // const endDate = new Date("2024/08/23");
      const startDate = new Date(trip.firstDate);
      const endDate = new Date(trip.lastDate);
      this.tripDaysTabs = [];
      let dayIndex = 1;
      this.tripDaysTabs.push({ label: `總覽頁`, name: `overview` });
      while (startDate <= endDate) {
        this.tripDaysTabs.push({
          label: `Day ${dayIndex}`,
          name: `day${dayIndex}`,
        });
        startDate.setDate(startDate.getDate() + 1);
        dayIndex++;
      }
      console.log(this.tripDaysTabs);
    },
    // 改變行程詳細頁title
    getDateLabel(day) {
      if (day === "overview") return "行程總覽";
      console.log(this.trips);
      console.log(this.tripKey);
      const trip = this.trips.filter((item) => item.primeKey === this.tripKey);

      console.log(trip);
      const start = new Date(trip[0].firstDate);
      const dayIndex = parseInt(day.replace("day", "")) - 1;
      start.setDate(start.getDate() + dayIndex);

      const month = start.getMonth() + 1;
      const date = start.getDate();
      const weekDay = ["日", "一", "二", "三", "四", "五", "六"][
        start.getDay()
      ];
      return `${month}/${date} 週${weekDay}`;
    },
    // 改變顏色
    getBadgeColor(day) {
      const index = this.tripDaysTabs.findIndex((d) => d.name === day);
      return this.colors[index % this.colors.length];
    },

    getTextColor(day) {
      const index = this.tripDaysTabs.findIndex((d) => d.name === day);
      return this.testColors[index % this.testColors.length];
    },
    // 新增行程天數
    addDay() {
      // const newEndDate = new Date(this.trip);
      console.log(this.tripDays.length);
      tripDays.push({
        label: `Day ${this.tripDays.length}`,
        name: `day${this.tripDays.length}`,
      });
      newEndDate.setDate(newEndDate.getDate() + 1);
      endDate.value = newEndDate.toISOString().split("T")[0];
    },
  },
  //瀏覽器視窗尺寸變更時 觸發 this.updateScreenWidth 方法
  mounted() {
    window.addEventListener("resize", this.updateScreenWidth);

    // === Leaflet 地圖初始化 ===
    const map = L.map("map", { zoomControl: false }).setView(
      [25.033, 121.5654],
      13
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    // 自訂縮放按鈕事件
    document.getElementById("btnZoomIn").onclick = () => map.zoomIn();
    document.getElementById("btnZoomOut").onclick = () => map.zoomOut();
    document.getElementById("btnCrosshair").onclick = () => {
      map.setView([25.033, 121.5654], 13);
    };
    // 更新資料
    this.tripDaysTabs = this.computedDays;
  },
  // 移除監聽器，避免組件被銷毀後還持續監聽，防止記憶體洩漏
  beforeUnmount() {
    window.removeEventListener("resize", this.updateScreenWidth);
  },
});

// 註冊 Element Plus
app.use(ElementPlus);

// 註冊所有 Icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
console.log(window.ElementPlusIconsVue);

app.mount("#index");
