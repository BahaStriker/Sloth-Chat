import {axiosInstance} from 'boot/api';
import 'boot/async';
export default {
	asyncComputed: {
		async otherUserDetails() {
      await axiosInstance.get("/staff/"+this.$route.params.id).then(response => {
        console.log("axios: ", response.data.staff[0].firstname + ' ' + response.data.staff[0].lastname);
        return response.data.staff[0];
      })
		}
	}
}
