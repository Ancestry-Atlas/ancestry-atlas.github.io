import axios from "axios";

async function makeRequest({
  route = "",
  method = "GET",
  data = null,
  params = {},
} = {}) {
  try {
    const response = await axios.request({
      method,
      url: `http://localhost:3005/${route}`,
      data,
      params,
    });
    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
    };
  }
}

export default {
  get_members: () => makeRequest({ method: "GET", route: "members" }),
  create_member: (data) =>
    makeRequest({ method: "POST", route: "members", data }),
  update_member: (id, data) =>
    makeRequest({ method: "PUT", route: `members/${id}`, data }),
  delete_member: (id) =>
    makeRequest({ method: "DELETE", route: `members/${id}` }),

  get_family_names: () => makeRequest({ method: "GET", route: "family_names" }),
  create_family_name: (data) =>
    makeRequest({ method: "POST", route: "family_names", data }),
  update_family_name: (id, data) =>
    makeRequest({ method: "PUT", route: `family_names/${id}`, data }),
  delete_family_name: (id) =>
    makeRequest({ method: "DELETE", route: `family_names/${id}` }),
};
