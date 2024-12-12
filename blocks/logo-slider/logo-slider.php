<div <?php echo get_block_wrapper_attributes(['class' => 'logo-slider-container']) ?>>
  <button class="logo-nav-arrow logo-left-arrow">&lt;</button>

  <div class="logo-track">
    <div class="logo-slide">
      <?php
      $logos = get_field('logos');
      if ($logos):
        foreach ($logos as $logo):
          $image = $logo['logo_image'];
            echo '<img src="' . $image['url'] . '" alt="' . $image['alt'] . '" class="logo">';
        endforeach;
      endif;
      ?>
    </div>
  </div>

  <button class="logo-nav-arrow logo-right-arrow">&gt;</button>
</div>