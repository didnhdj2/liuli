<template>
  <div class="app-content">
    <div class="flex f-jsb">
      <div
        v-for="(item, index) in statData.stats"
        class="flex card f-ac f-jsb ptb-10 plr-40 mr-6"
        @click="handleClick(item.path)"
      >
        <img :src="getImageUrl(item.image)" alt="" class="img mr-20" />
        <div class="flex fc f-ac f-jsb">
          <div class="count">{{ item.counts }}</div>
          <div class="mt-10 title">{{ item.name }}</div>
        </div>
      </div>
    </div>

    <!-- <main class="main-content">
      <div class="grid" style="margin-left: 5px; margin-right: 5px">
        <div v-for="stat in statData.stats">
          <a :href="stat.path">
            <div class="stats-panel">
              <div class="stats-panel-ico">
                <img :src="stat.image" alt="" />
              </div>
              <div class="stats-panel-details">
                <div class="stats-panel-details-count">{{ stat.counts }}</div>
                <div class="stats-panel-details-title">{{ stat.name }}</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </main> -->
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../store/user';
import { userApi } from '../api/index';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

const collapsed = ref(false);
const title = ref('首页概览');

const statData = ref({
  stats: [
    {
      path: '/subscription',
      counts: 0,
      name: '订阅数',
      image: '/src/assets/images/home/subscription.svg'
    },
    {
      path: '/favorite',
      counts: 0,
      name: '收藏数',
      image: '/src/assets/images/home/favorite.svg'
    },
    {
      path: '/bookmark',
      counts: 0,
      name: '书签数',
      image: '/src/assets/images/home/page.svg'
    },
    {
      path: '/doc_source',
      counts: 0,
      name: '订阅源',
      image: '/src/assets/images/home/doc_source.svg'
    }
  ]
});

function menuStatus(value) {
  // 获取导航栏传递过来的状态值
  collapsed.value = value;
}

const getImageUrl = (name) => {
  return new URL(name, import.meta.url).href;
};

const $router = useRouter();
function handleClick(path) {
  $router.push({ path });
}

onMounted(() => {
  const userStore = useUserStore();

  userApi
    .getStats({
      username: userStore.getUsername
    })
    .then((res) => {
      if (res.status == 200) {
        console.log(res);
        // 有结果表示正常请求
        statData.value.doc_counts = res.data.doc_counts;
        statData.value.doc_source_counts = res.data.doc_source_counts;
        statData.value.stats = [
          {
            path: '/subscription',
            counts: res.data.doc_counts,
            name: '订阅数',
            image: '/src/assets/images/home/subscription.svg'
          },
          {
            path: '/favorite',
            counts: 0,
            name: '收藏数',
            image: '/src/assets/images/home/favorite.svg'
          },
          {
            path: '/bookmark',
            counts: 0,
            name: '书签数',
            image: '/src/assets/images/home/page.svg'
          },
          {
            path: '/doc_source',
            counts: res.data.doc_source_counts,
            name: '订阅源',
            image: '/src/assets/images/home/doc_source.svg'
          }
        ];
      } else {
        const msg = res.info ? res.info : '服务器超时';
        ElMessage({
          message: msg,
          type: 'error'
        });
      }
    });
});
</script>

<style scoped>
.card {
  height: 120px;
  background-color: #fff;
  cursor: pointer;
  width: calc(25% - 30px);
  min-width: 230px;
  font-size: 12px;
  border-radius: 10px;
  box-shadow: 4px 4px 40px rgb(0 0 0 / 5%);
  border-color: rgba(0, 0, 0, 0.05);
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
}
.title {
  color: rgb(0 0 0 / 61%);
  font-weight: 500;
  font-size: 16px;
}
.count {
  font-size: 20px;
  font-weight: 700;
  color: #666;
  text-align: center;
}
.img {
  filter: drop-shadow(10000px 0 0 #434141);
  transform: translate(-10000px);
  height: 50px !important;
  width: 60px;
}

/* div.stats-panel {
  height: 120px;
  background-color: #fff;
  cursor: pointer;
  font-size: 12px;
  border-radius: 10px;
  box-shadow: 4px 4px 40px rgb(0 0 0 / 5%);
  border-color: rgba(0, 0, 0, 0.05);

  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  box-shadow: rgb(220 214 214 / 20%) 0px 3px 1px -2px, rgb(180 173 173 / 14%) 0px 2px 2px 0px,
    rgb(213 203 203 / 12%) 0px 1px 5px 0px; 

  box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px, rgb(0 0 0 / 14%) 0px 2px 2px 0px,
    rgb(0 0 0 / 12%) 0px 1px 5px 0px;
}

div.stats-panel:hover {
  background-color: #fff;
 box-shadow: 4px 4px 40px rgba(249, 204, 204, 0.291); 
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%),
    0px 1px 10px 0px rgb(0 0 0 / 12%);
}

div.stats-panel:hover .stats-panel-details-title {
   color: #e2989e; 
  color: #434141;
}

div.stats-panel:hover img {
  filter: drop-shadow(10000px 0 0 #434141);
  filter: drop-shadow(10000px 0 0 #e8878f); 
  transform: translate(-10000px);
}

div.stats-panel-ico {
  float: left;
  margin-top: 35px;
  width: 60px;
  margin-left: 20%;
}


div.stats-panel-details {
  float: right;
  margin-right: 20%;
  margin-top: 30px;
}

div.stats-panel-details-title {
  color: rgb(0 0 0 / 61%);
  font-weight: 500;
  font-size: 16px;
}

div.stats-panel-details-count {
  font-size: 20px;
  font-weight: 700;
  color: #666;
  text-align: center;
} */
</style>
