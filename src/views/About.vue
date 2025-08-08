<script setup>
// Importing mobile components
import MobileHeader from '@/components/header/MobileHeader.vue';
</script>

<template>
    <div class="container">
        <MobileHeader title="About" />

        <div class="about">
            <h2 class="about__title">About DTT Real Estate</h2>

            <p class="about__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.</p>
            <p class="about__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore etdolore magna aliqua.</p>
        </div>

        <div class="about-dev">
            <h2 class="about-dev__title">Design and Development</h2>

            <div class="about-dev__content">
                <img class="about-dev__logo" src="/src/assets/logo/img_logo_dtt@3x.png" alt="DTT"></img>

                <div class="about-dev__info">
                    <p class="about-dev__text">By DTT</p>
                    <a class="about-dev__link" href="">www.d-tt.nl</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.about,
.about-dev,
.about-dev__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.about {
    margin-top: 14px;
}

.about__text {
    margin-bottom: 10px;
    width: 100%;
}

.about-dev__content {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.about-dev__logo {
    width: 90px;
    height: auto;
}

.about-dev__info {
    gap: 0;
}

@media (min-width: 1024px) {
    .about {
        margin-top: 50px;
    }

    h2 {
        margin-bottom: 10px;
    }

    .about-dev {
        margin-top: 20px;
    }

    .about-dev__content {
        align-items: center;
    }

    .about-dev__logo {
        width: 140px;
    }
}
</style>
