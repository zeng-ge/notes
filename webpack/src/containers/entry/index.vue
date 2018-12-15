<template>
  <div>
    <div class="entry">entry</div>
    <img src="../../assets/photo.jpg">
    <grid-layout
      :layout.sync="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(item, index) in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="index"
      >{{item.i}}</grid-item>
    </grid-layout>
  </div>
</template>

<script src="./index.js"></script>
<style src="./entry.scss" lang="scss"></style>

