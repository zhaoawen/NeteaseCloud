<template>
      <div class="bgtop">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
  .bgtop {
    border-radius: 0.3rem;
    padding: 0.2rem;
    width: 100%;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: -0.5%;
    .icon {
      fill: #999;
    }
  }
</style>