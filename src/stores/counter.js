import { defineStore } from 'pinia';
import axios from 'axios';
const baseUrl = 'http://localhost:9000';
export const useBookingStore = defineStore('booking', {
  state: () => ({
    hotelByLocation: [],
    hotelsData: [],
    roomsHotel: [],
    detailHotel: {},
  }),
  getters: {},
  actions: {
    async handleRegister(form) {
      try {
        const { data } = await axios.post(baseUrl + '/register', form);
        console.log(data, 'ini data');
        this.router.push('/login');
      } catch (err) {
        console.log(err);
      }
    },
    async handleLogin(form) {
      try {
        const { data } = await axios.post(baseUrl + '/login', form);
        console.log(data);
        localStorage.setItem('access_token', data.access_token);
        this.router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
    async resetPassword(email) {
      try {
        const { data } = await axios.post(baseUrl + '/forgot-password', email);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async handleResetPassword(password, token) {
      try {
        const { data } = await axios.patch(
          baseUrl + '/reset-password?token=' + token,
          password
        );
        console.log(data);
        this.router.push('/');
      } catch (err) {
        console.log(err);
      }
    },
    async fetchHotelByLocation() {
      try {
        const { data } = await axios.get(baseUrl + '/hotels/location');
        this.hotelByLocation = data;
        console.log(data, 'ini dari pinia');
      } catch (err) {
        console.log(err);
      }
    },
    async fetchHotel() {
      try {
        const { data } = await axios.get(baseUrl + '/hotels');
        this.hotelsData = data;
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },
    async getHotelRooms(hotelId) {
      try {
        const { data } = await axios.get(baseUrl + '/hotels/' + hotelId);

        const block = data?.block.map((el) => {
          el.detail = data.rooms[el.roomId];
          return el;
        });
        console.log(data, '====', block);
        this.roomsHotel = block;
      } catch (err) {
        console.log(err);
      }
    },
    async getDetailHotel(idHotel, searchId) {
      try {
        const { data } = await axios.get(
          baseUrl + '/hotels/properties/' + idHotel + '?search_id=' + searchId
        );
        console.log(data);
        this.detailHotel = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
