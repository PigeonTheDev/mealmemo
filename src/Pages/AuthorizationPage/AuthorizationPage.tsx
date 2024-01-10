import { useState } from "react";
import { Login } from "../../Components/Login/Login";
import { SignUp } from "../../Components/SignUp/SignUp";
import "./AuthorizationPage.scss";
import sushi from "./SUSHI.png";
import pie from "./PIE.png";
import mushrooms from "./MUSHROOMS.png";
import { UserWithPass } from "../../Models/UserWithPass";
import { loginUser, registerUser } from "../../API/fake_api";
import { LANDING_ROUTE } from "../../Enums/ROUTE_PATH_TITLE";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { LOGIN_FINALLY } from "../../Redux/UserActions";
import { FoodLoader } from "../../Components/Base/FoodLoader/FoodLoader";

export const AuthorizationPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (user: UserWithPass, stayLoggedIn: boolean) => {
    setIsLoading(true);
    loginUser(user)
      .then((data) => {
        console.log(data);
        if (stayLoggedIn) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        dispatch(LOGIN_FINALLY(data));
        navigate(`${LANDING_ROUTE.PATH}`);
      })
      .finally(() => setIsLoading(false));
  };

  const handleRegister = (user: UserWithPass) => {
    registerUser(user)
      .then((data) => {
        console.log(data);
        dispatch(LOGIN_FINALLY(data));
        navigate(`${LANDING_ROUTE.PATH}`);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="authorizationWrapper">
      <FoodLoader isLoading={isLoading} />
      <div className="authorizationInfoWrapper">
        <svg width="500" height="92" viewBox="0 0 500 92" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M36.8055 90V28.92C36.8055 27.56 36.5255 26.44 35.9655 25.56C35.4855 24.6 34.6455 23.52 33.4455 22.32C32.2455 21.12 31.2855 20.52 30.5655 20.52C28.9655 20.52 26.8455 22.12 24.2055 25.32C24.4455 27.32 24.5655 29.44 24.5655 31.68V90H8.00547V38.64C8.00547 31.84 7.52547 27.08 6.56547 24.36C5.68547 21.64 3.76547 18.4 0.805469 14.64L15.2055 4.56C17.7655 6.4 19.6055 8.6 20.7255 11.16C26.4855 6.76 30.5655 4.56 32.9655 4.56C35.3655 4.56 39.8855 7.64 46.5255 13.8C53.1655 7.64 57.8455 4.56 60.5655 4.56C62.5655 4.56 65.9655 6.68 70.7655 10.92C75.6455 15.08 78.6855 18.04 79.8855 19.8C81.0855 21.48 81.6855 23.72 81.6855 26.52V90H65.1255V28.92C65.1255 27.4 64.8455 26.24 64.2855 25.44C63.7255 24.56 62.7655 23.52 61.4055 22.32C60.1255 21.12 58.9655 20.52 57.9255 20.52C56.9655 20.52 55.4055 21.84 53.2455 24.48C53.3255 24.88 53.3655 25.56 53.3655 26.52V90H36.8055ZM136.21 57.48V61.8H107.17C107.17 66.6 107.77 70.4 108.97 73.2C109.37 74.16 110.09 75.16 111.13 76.2C112.17 77.16 113.25 77.64 114.37 77.64C115.49 77.64 116.89 76.68 118.57 74.76C120.25 72.84 121.57 70.52 122.53 67.8L134.89 76.56C132.73 80.56 129.41 84.04 124.93 87C120.53 89.96 116.97 91.44 114.25 91.44C111.53 91.44 107.57 89.32 102.37 85.08C97.2505 80.84 94.1305 77.56 93.0105 75.24C91.8905 72.84 91.3305 67 91.3305 57.72C91.3305 48.36 91.8905 42.52 93.0105 40.2C94.1305 37.8 97.2505 34.48 102.37 30.24C107.57 26 111.37 23.88 113.77 23.88C116.17 23.88 119.93 26 125.05 30.24C130.25 34.48 133.41 37.8 134.53 40.2C135.65 42.52 136.21 48.28 136.21 57.48ZM119.53 42.48C118.97 41.36 118.05 40.28 116.77 39.24C115.57 38.2 114.41 37.68 113.29 37.68C112.25 37.68 111.05 38.76 109.69 40.92C108.33 43 107.49 46.16 107.17 50.4H120.85C120.61 46.16 120.17 43.52 119.53 42.48ZM190.251 25.32V74.52C190.731 77.32 192.611 79.8 195.891 81.96L185.091 91.2C184.051 90.48 182.771 89.2 181.251 87.36C179.731 85.52 178.451 83.64 177.411 81.72C170.771 88.2 166.131 91.44 163.491 91.44C161.571 91.44 158.451 89.32 154.131 85.08C149.891 80.84 147.251 77.4 146.211 74.76C145.171 72.12 144.651 66.44 144.651 57.72C144.651 48.92 145.171 43.2 146.211 40.56C147.251 37.92 149.891 34.48 154.131 30.24C158.451 26 161.571 23.88 163.491 23.88C166.291 23.88 170.811 26.76 177.051 32.52L178.491 25.32H190.251ZM173.571 43.68C173.011 42.64 171.851 41.6 170.091 40.56C168.411 39.44 167.131 38.88 166.251 38.88C165.371 38.88 164.411 39.4 163.371 40.44C162.411 41.48 161.771 42.44 161.451 43.32C160.411 44.76 159.891 49.56 159.891 57.72C159.891 65.8 160.411 70.56 161.451 72C161.771 72.8 162.411 73.76 163.371 74.88C164.411 75.92 165.371 76.44 166.251 76.44C167.131 76.44 168.411 75.92 170.091 74.88C171.851 73.76 172.971 72.76 173.451 71.88C174.011 71 174.331 66.32 174.411 57.84C174.411 49.36 174.131 44.64 173.571 43.68ZM201.852 -7.15256e-06H217.692V66.84C217.692 70.92 218.172 74.08 219.132 76.32C220.092 78.56 221.612 80.52 223.692 82.2L210.492 91.44C204.732 86.88 201.852 80.4 201.852 72V-7.15256e-06ZM262.743 90V28.92C262.743 27.56 262.463 26.44 261.903 25.56C261.423 24.6 260.583 23.52 259.383 22.32C258.183 21.12 257.223 20.52 256.503 20.52C254.903 20.52 252.783 22.12 250.143 25.32C250.383 27.32 250.503 29.44 250.503 31.68V90H233.943V38.64C233.943 31.84 233.463 27.08 232.503 24.36C231.623 21.64 229.703 18.4 226.743 14.64L241.143 4.56C243.703 6.4 245.543 8.6 246.663 11.16C252.423 6.76 256.503 4.56 258.903 4.56C261.303 4.56 265.823 7.64 272.463 13.8C279.103 7.64 283.783 4.56 286.503 4.56C288.503 4.56 291.903 6.68 296.703 10.92C301.583 15.08 304.623 18.04 305.823 19.8C307.023 21.48 307.623 23.72 307.623 26.52V90H291.063V28.92C291.063 27.4 290.783 26.24 290.223 25.44C289.663 24.56 288.703 23.52 287.343 22.32C286.063 21.12 284.903 20.52 283.863 20.52C282.903 20.52 281.343 21.84 279.183 24.48C279.263 24.88 279.303 25.56 279.303 26.52V90H262.743ZM362.148 57.48V61.8H333.108C333.108 66.6 333.708 70.4 334.908 73.2C335.308 74.16 336.028 75.16 337.068 76.2C338.108 77.16 339.188 77.64 340.308 77.64C341.428 77.64 342.828 76.68 344.508 74.76C346.188 72.84 347.508 70.52 348.468 67.8L360.828 76.56C358.668 80.56 355.348 84.04 350.868 87C346.468 89.96 342.908 91.44 340.188 91.44C337.468 91.44 333.508 89.32 328.308 85.08C323.188 80.84 320.068 77.56 318.948 75.24C317.828 72.84 317.268 67 317.268 57.72C317.268 48.36 317.828 42.52 318.948 40.2C320.068 37.8 323.188 34.48 328.308 30.24C333.508 26 337.308 23.88 339.708 23.88C342.108 23.88 345.868 26 350.988 30.24C356.188 34.48 359.348 37.8 360.468 40.2C361.588 42.52 362.148 48.28 362.148 57.48ZM345.468 42.48C344.908 41.36 343.988 40.28 342.708 39.24C341.508 38.2 340.348 37.68 339.228 37.68C338.188 37.68 336.988 38.76 335.628 40.92C334.268 43 333.428 46.16 333.108 50.4H346.788C346.548 46.16 346.108 43.52 345.468 42.48ZM417.148 90H401.308V45.36C401.308 44 400.588 42.6 399.148 41.16C397.708 39.64 396.468 38.88 395.428 38.88C394.468 38.88 392.868 39.84 390.628 41.76V90H374.788V48.6C374.788 44.52 374.308 41.36 373.348 39.12C372.388 36.88 370.868 34.92 368.788 33.24L381.988 24C384.628 26.24 386.588 28.52 387.868 30.84C393.068 26.2 396.668 23.88 398.668 23.88C399.868 23.88 401.828 24.76 404.548 26.52C407.268 28.28 409.748 30.4 411.988 32.88C418.308 26.88 422.668 23.88 425.068 23.88C427.548 23.88 431.228 26.12 436.108 30.6C441.068 35 443.548 39.36 443.548 43.68V66.84C443.548 70.92 444.028 74.08 444.988 76.32C445.948 78.56 447.468 80.52 449.548 82.2L436.348 91.44C430.588 86.88 427.708 80.4 427.708 72V45.36C427.708 44 426.988 42.6 425.548 41.16C424.108 39.64 422.908 38.88 421.948 38.88C421.068 38.88 419.388 39.88 416.908 41.88C417.068 42.68 417.148 43.28 417.148 43.68V90ZM474.403 75.84C475.683 77.04 476.683 77.64 477.403 77.64C478.123 77.64 479.083 77.04 480.283 75.84C481.563 74.64 482.483 73.56 483.043 72.6C484.083 70.84 484.603 65.88 484.603 57.72C484.603 49.56 484.083 44.56 483.043 42.72C482.483 41.76 481.563 40.68 480.283 39.48C479.083 38.28 478.123 37.68 477.403 37.68C476.683 37.68 475.683 38.28 474.403 39.48C473.203 40.68 472.323 41.76 471.763 42.72C470.723 44.48 470.203 49.44 470.203 57.6C470.203 65.76 470.723 70.76 471.763 72.6C472.323 73.56 473.203 74.64 474.403 75.84ZM488.203 85.56C483.323 89.48 479.723 91.44 477.403 91.44C475.083 91.44 471.443 89.48 466.483 85.56C461.603 81.64 458.603 78.72 457.483 76.8C455.803 73.84 454.963 67.44 454.963 57.6C454.963 47.76 455.803 41.4 457.483 38.52C458.603 36.6 461.603 33.68 466.483 29.76C471.443 25.84 475.083 23.88 477.403 23.88C479.723 23.88 483.323 25.84 488.203 29.76C493.163 33.68 496.203 36.6 497.323 38.52C499.003 41.4 499.843 47.76 499.843 57.6C499.843 67.44 499.003 73.84 497.323 76.8C496.203 78.72 493.163 81.64 488.203 85.56Z"
            fill="#F27A1A"
          />
        </svg>
        <div className="authComponentWrapper">
          {isLogin ? (
            <Login onLogin={handleLogin} authComponentOnChange={() => setIsLogin(false)} />
          ) : (
            <SignUp onRegister={handleRegister} authComponentOnChange={() => setIsLogin(true)} />
          )}
        </div>
      </div>
      <div className="authorizationImagesWrapper">
        <img src={sushi} alt="SUSHI" />
        <div className="imgBorder1" />

        <img src={pie} alt="PIE" />
        <div className="imgBorder2" />

        <img style={{ width: "20%", borderRight: "none" }} src={mushrooms} alt="MUSHROOMS" />
      </div>
    </div>
  );
};
