<div class="logo-slider-container">
  <button class="nav-arrow left-arrow">&lt;</button>

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

  <button class="nav-arrow right-arrow">&gt;</button>
</div>