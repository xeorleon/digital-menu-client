<template>
  <div class="landing light-style">
    <app-navbar />
    <b-jumbotron class="ui-hero ui-mh-100vh ui-bg-cover">
      <b-container fluid class="pr-lg-5 pl-xl-5">
        <b-row no-gutters class="justify-content-center w-100 pt-3">
          <b-col lg="7" xl="6" class="text-lg-left text-center my-5 mr-xl-5">
            <h1
              class="display-4 font-secondary text-white font-weight-semibold mb-4"
            >
              Lorem ipsum dolor sit amet
            </h1>
            <p class="lead text-light pb-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur eum, tempore quisquam, saepe nam aperiam dolorem,
              ducimus veritatis deserunt aspernatur doloribus labore! Nulla
              deserunt velit magni vitae ab expedita quaerat?
            </p>
            <b-link
              to="/register"
              class="btn-outline-light btn btn-lg rounded-pill mt-2"
              >ÜCRETSİZ DENE</b-link
            >
          </b-col>
          <b-col lg="5" class="text-center pl-lg-5 pl-xl-2 my-5">
            <img
              class="w-100"
              src="../assets/landing-img.png"
              style="max-width: 550px"
            />
          </b-col>
        </b-row>
      </b-container>
    </b-jumbotron>
    <div class="bg-white">
      <div class="landing-block pb-5">
        <b-container class="px-3">
          <b-col md="10" lg="8" xl="7" class="text-center p-0 mx-auto">
            <div class="display-4 text-landing-primary mb-4">
              <i class="lnr lnr-rocket"></i>
            </div>
            <h1 class="display-5 font-secondary font-weight-semibold mb-5">
              Ultimate Tool for Professionals
            </h1>
            <div class="custom-text-muted">
              Lorem ipsum dolor sit amet, ad eam consul vituperata. Cum assum
              inimicus an, his ne liber aeterno debitis. Te his iudico tollit
              efficiendi. Eu harum volumus pri, oporteat probatus disputationi
              id his. Mei in vidit mollis mediocrem, cum ad suas democritum, ea
              eos e ligendi nominati volutpat.
            </div>
          </b-col>
        </b-container>
      </div>
      <div class="landing-separator-stripes my-4"></div>
    </div>
    <div id="features" class="landing-block">
      <b-container class="px-3">
        <b-col md="10" lg="8" xl="7" class="text-center p-0 mx-auto">
          <div
            class="text-center custom-text-muted text-small font-weight-bold mb-3"
          >
            FEATURES
          </div>
          <h1 class="display-5 font-secondary font-weight-semibold mb-4">
            Everything That You Need In One App
          </h1>
          <div class="custom-text-muted mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur at nisi sapiente voluptatibus facilis eaque quia
            deserunt reiciendis in? Culpa excepturi ab dicta voluptates
            reiciendis quis enim numquam, doloribus distinctio.
          </div>
        </b-col>
        <hr class="landing-separator border-light mx-auto" />
        <b-row class="text-center">
          <feature
            description="Lorem ipsum dolor sit amet, ius virtute suscipit te. Ius prima euismod consequat eu, cu quo alii scriptorem"
            title="Everything That You"
            iconClass="lnr lnr-star"
          />
          <feature
            description="Lorem ipsum dolor sit amet, ius virtute suscipit te. Ius prima euismod consequat eu, cu quo alii scriptorem"
            title="Everything That You"
            iconClass="lnr lnr-star"
          />
          <feature
            description="Lorem ipsum dolor sit amet, ius virtute suscipit te. Ius prima euismod consequat eu, cu quo alii scriptorem"
            title="Everything That You"
            iconClass="lnr lnr-star"
          />
          <feature
            description="Lorem ipsum dolor sit amet, ius virtute suscipit te. Ius prima euismod consequat eu, cu quo alii scriptorem"
            title="Everything That You"
            iconClass="lnr lnr-star"
          />
          <feature
            description="Lorem ipsum dolor sit amet, ius virtute suscipit te. Ius prima euismod consequat eu, cu quo alii scriptorem"
            title="Everything That You"
            iconClass="lnr lnr-star"
          />
          <feature
            description="Lorem ipsum dolor sit amet, ius virtute suscipit te. Ius prima euismod consequat eu, cu quo alii scriptorem"
            title="Everything That You"
            iconClass="lnr lnr-star"
          />
        </b-row>
      </b-container>
    </div>
    <div id="screenshots" class="landing-block bg-white">
      <discover-app />
    </div>
    <b-container class="landing-block px-3">
      <div
        class="text-center custom-text-muted text-small font-weight-bold mb-3"
      >
        INSIGHTS
      </div>
      <h1 class="display-5 font-secondary text-center font-weight-semibold">
        How It Works
      </h1>
      <hr class="landing-separator border-success mx-auto mt-5 mb-4" />
      <b-row class="text-center">
        <how-it-works
          iconClass="lnr lnr-star"
          title="Lorem ipsum dolor sit amet"
          description="Lorem ipsum dolor sit amet, ius virtute suscipit te. Ius prima euismod consequat eu, cu quo alii scriptorem"
        ></how-it-works>
        <how-it-works
          iconClass="lnr lnr-star"
          title="Lorem ipsum dolor sit amet"
          description="Lorem ipsum dolor sit amet, ius virtute suscipit te. Ius prima euismod consequat eu, cu quo alii scriptorem"
        ></how-it-works>
        <how-it-works
          iconClass="lnr lnr-star"
          title="Lorem ipsum dolor sit amet"
          description="Lorem ipsum dolor sit amet, ius virtute suscipit te. Ius prima euismod consequat eu, cu quo alii scriptorem"
        ></how-it-works>
      </b-row>
    </b-container>
    <div class="bg-white">
      <b-container id="pricing" class="landing-block px-3">
        <div
          class="text-center custom-text-muted text-small font-weight-bold mb-3"
        >
          PRICING
        </div>
        <h1 class="display-5 font-secondary text-center font-weight-semibold">
          Pay Only for What You Need
        </h1>
        <hr class="landing-separator border-primary my-5 mx-auto" />
        <pricing :subscriptionTypes="subscriptionType" />
      </b-container>
    </div>
    <app-footer />
  </div>
</template>

<script>
import Feature from "@/components/Landing/Feature.vue";
import DiscoverApp from "@/components/Landing/DiscoverApp.vue";
import HowItWorks from "@/components/Landing/HowItWorks.vue";
import Pricing from "@/components/Landing/Pricing.vue";
import AppFooter from "@/components/Landing/Footer.vue";
import AppNavbar from "@/components/Landing/Navbar.vue";
export default {
  components: {
    Feature,
    DiscoverApp,
    HowItWorks,
    Pricing,
    AppFooter,
    AppNavbar,
  },
  title: "Home",

  data() {
    return {
      subscriptionType: [
        {
          title: "test1",
          price: 5,
        },
        {
          title: "test2",
          price: 10,
        },
        {
          title: "test3",
          price: 15,
        },
      ],
    };
  },
};
</script>

<style>
.landing-block {
  padding-top: 5rem;
  padding-bottom: 5rem;
}

.landing .font-secondary {
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

.landing .landing-btn {
  text-transform: uppercase;
  letter-spacing: 0.06991em;
  font-weight: 600;
  font-size: 85%;
  font-family: "Raleway", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
}

hr.landing-separator {
  margin: 0 0 1.25rem 0;
  width: 3rem;
  border-width: 2px;
  text-align: left;
}

.landing-separator-stripes {
  width: 100%;
  height: 4px;
  background-image: linear-gradient(
    45deg,
    rgba(0, 0, 0, 0.06) 25%,
    transparent 25%,
    transparent 50%,
    rgba(0, 0, 0, 0.06) 50%,
    rgba(0, 0, 0, 0.06) 75%,
    transparent 75%,
    #fff
  );
  background-size: 4px 4px;
}

.ui-mh-100vh {
  min-height: 100vh;
}

.ui-bg-cover {
  background-color: rgba(0, 0, 0, 0);
  background-position: center center;
  background-size: cover;
}

.jumbotron {
  background: #e8cbc0;
  background: linear-gradient(to right, #43cea2, #185a9d);
}

.jumbotron.ui-hero {
  display: -ms-flexbox;
  display: flex;
  margin: 0;
  padding-right: 0;
  padding-left: 0;
  border-radius: 0;
}

.jumbotron.ui-hero > .container,
.jumbotron.ui-hero > .container-fluid {
  display: -ms-flexbox;
  display: flex;
}
.jumbotron.ui-hero > .container > .row,
.jumbotron.ui-hero > .container-fluid > .row {
  -ms-flex-align: center;
  align-items: center;
}

.light-style .ui-hero > .container > .row {
  width: calc(100% + 1.5rem);
}

@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  .light-style .ui-mh-100vh::after {
    content: "";
    display: block;
    -ms-flex: 0 0 0%;
    flex: 0 0 0%;
    min-height: 100vh;
    width: 0;
    font-size: 0;
  }
  .light-style .ui-mh-100vh.jumbotron::after {
    min-height: calc(100vh - 6rem);
  }
  .light-style .ui-mh-100vh.flex-column::after {
    display: none;
  }
}
@media all and (min-width: 576px) and (-ms-high-contrast: none),
  (-ms-high-contrast: active) {
  .light-style .ui-mh-100vh.jumbotron::after {
    min-height: calc(100vh - 12rem);
  }
}
</style>
