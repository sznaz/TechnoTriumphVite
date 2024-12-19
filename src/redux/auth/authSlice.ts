import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface UserDetails {
  _id: string;
  fullname: string;
  email: string;
  roles: string[];
  status: number;
  tenant: string[];
  createdAt: string;
  updatedAt: string;
  refreshToken: string;
}


  
  




interface AuthState {
  otpToken: string;
  userEmail: string;
  registerToken: string | null;
  userDetails: UserDetails | null;
  fullname: string;
  role: string;
  accessToken: string | null;
  refreshToken: string | null;
  idToken: string;
  isAuthenticated: boolean;
  tenantId: string;
  selectedButton: number;
}

const initialState: AuthState = {
  otpToken: "",
  userEmail: "",
  fullname: "",
  refreshToken: "",
  registerToken: "",
  role: "recruiter",
  accessToken: "",
  userDetails: null,
  idToken: "",
  tenantId: "",
  isAuthenticated: false,
  selectedButton: 1
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOtpToken(state, action: PayloadAction<string>) {
      state.otpToken = action.payload;
    },
    setUserEmail(state, action: PayloadAction<string>) {
      state.userEmail = action.payload;
    },
    setFullname(state, action: PayloadAction<string>) {
      state.fullname = action.payload;
    },
    setRole(state, action: PayloadAction<string>) {
      state.role = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setIdToken(state, action: PayloadAction<string>) {
      state.idToken = action.payload;
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
    setUserDetails(state, action: PayloadAction<UserDetails | null>) {
      state.userDetails = action.payload;
    },
    setRegisterToken(state, action: PayloadAction<string>) {
      state.registerToken = action.payload;
    },
    setTenantId(state, action: PayloadAction<string>) {
      state.tenantId = action.payload;
    },
    setSelectedButton(state, action: PayloadAction<number>) {
      state.selectedButton = action.payload;
    },
    login(
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    refreshTokenSuccess(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },
    // resetAuth(state) {
    //   return initialState;
    // }
  },
});

export const {
  setOtpToken,
  setUserEmail,
  setFullname,
  setRole,
  setAccessToken,
  setIdToken,
  setRegisterToken,
  setTenantId,
  setRefreshToken,
  setUserDetails,
  login,
  logout,
  refreshTokenSuccess,
  setSelectedButton
} = authSlice.actions;
export default authSlice.reducer;
