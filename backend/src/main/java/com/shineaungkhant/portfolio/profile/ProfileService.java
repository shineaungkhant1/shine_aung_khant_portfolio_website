package com.shineaungkhant.portfolio.profile;

import com.shineaungkhant.portfolio.common.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProfileService {

  private final ProfileRepository profiles;

  public ProfileService(ProfileRepository profiles) {
    this.profiles = profiles;
  }

  @Transactional(readOnly = true)
  public Profile get() {
    return profiles.findAll().stream().findFirst().orElseThrow(() -> new NotFoundException("Profile not found"));
  }

  @Transactional
  public Profile save(ProfileRequest request) {
    Profile profile = profiles.findAll().stream().findFirst().orElseGet(Profile::new);
    profile.apply(request);
    return profiles.save(profile);
  }
}
