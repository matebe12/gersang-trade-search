<template>
  <div class="home">
    <div class="form">
      <div>
        <select name="" id="" v-model="serverSelect">
          <option value="1">백호</option>
          <option value="2">주작</option>
          <option value="3">현무</option>
        </select>
        <select name="" id="" v-model="typeSelect">
          <option value="1">아이템</option>
          <option value="2">용병</option>
        </select>
        <input
          type="text"
          id="inputData"
          placeholder="검색어를 입력 해주세요."
          v-model="inputData"
        />

        <button type="button" @click="searchItem" class="button" id="searchBtn">
          검색
        </button>
        <div class="keyword" id="keyword" style="display:none;">
          <div
            v-for="(item, index) in keyword"
            :key="index"
            class="item"
            @click="setInput(index)"
            tabindex="0"
          >
            <img
              :src="item.image_url"
              alt=""
              :class="{
                'item-img':
                  item.hasOwnProperty('image_url') && item.image_url !== null,
              }"
            />
            <p class="item_name">{{ item.item_name }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchTrade, searchTradeKeyword } from '@/api/trade';
export default {
  data() {
    return {
      inputData: '',
      serverSelect: '1',
      typeSelect: '1',
      timer: null,
      keyword: null,
      currentCount: -1,
    };
  },
  mounted() {
    let input = document.getElementById('inputData');

    document.addEventListener('click', function(e) {
      let x = document.getElementsByClassName('item');
      let inp = document.getElementById('inputData');
      //for (var i = 0; i < x.length; i++) {
      if (e.target != x && e.target != inp) {
        let key = document.getElementById('keyword');
        key.style.display = 'none';
      }
      //}
    });
    input.addEventListener('keyup', event => {
      let key = document.getElementById('keyword');
      let x = key.getElementsByClassName('item');
      if (event.keyCode === 40) {
        this.currentCount++;
        this.addActive(x);
        return;
      } else if (event.keyCode == 38) {
        this.currentCount--;
        this.addActive(x);
        return;
      } else if (event.keyCode == 13) {
        event.preventDefault();
        if (this.currentCount > -1) {
          if (x) input.value = x[this.currentCount].lastChild.innerText;
          key.style.display = 'none';
          document.getElementById('searchBtn');
          this.removeActive(x);
          this.currentCount = -1;
          return;
        }
      }
      try {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(async () => {
          console.log(input.value);
          const req = {
            inputData: input.value,
          };
          const res = await searchTradeKeyword(req);
          if (res.data.length > 0 && res.data !== 'OK') {
            this.keyword = res.data;
            key.style.display = 'block';
          } else {
            console.log('OKOKOKOK');
            key.style.display = 'none';
          }
          console.log(res);
        }, 500);
      } catch (error) {
        console.log(error);
      }
    });
  },
  methods: {
    async searchItem() {
      try {
        const req = {
          server: this.serverSelect,
          inputData: this.inputData,
          type: this.typeSelect,
        };
        const res = await searchTrade(req);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
    addActive(x) {
      if (!x) return false;
      this.removeActive(x);
      if (this.currentCount >= x.length) this.currentCount = 0;
      if (this.currentCount < 0) this.currentCount = x.length - 1;
      x[this.currentCount].classList.add('autocomplete-active');
    },
    removeActive(x) {
      for (let i = 0; i < x.length; i++) {
        x[i].classList.remove('autocomplete-active');
      }
    },
    setInput(i) {
      console.log(i);
      let key = document.getElementById('keyword');
      let x = key.getElementsByClassName('item');
      document.getElementById('inputData').value = x[i].lastChild.innerText;
      this.removeActive(x);
      key.style.display = 'none';
      this.currentCount = -1;
    },
  },
};
</script>

<style scoped>
.form {
  width: 750px;
}
.home {
  position: relative;
}
select,
option {
  padding: 15px 32px;
  border: none;
  margin: 0.5%;
}
input[type='text'] {
  padding: 13px 32px;
  border: none;
  margin: 0.5%;
}
.button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 20px 38px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}
input[type='submit'],
input[type='text'],
select {
  font-size: 20px;
}
.keyword {
  position: absolute;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 39%;
  right: 20%;
}
.item {
  background-color: #ffffff;
  text-align: center;
  display: flex;
  border-bottom: 1px solid gray;
  border-radius: 8px 12px;
  padding: 1%;
  cursor: pointer;
}

.item-img {
  text-align: center;
  width: 40px;
  height: 40px;
}
.autocomplete-active {
  background-color: bisque;
}
</style>
