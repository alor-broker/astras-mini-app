import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";

@Component({
  selector: 'tga-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.less'
})
export class AuthComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.authService.setRefreshToken(params['refreshToken']?.trim(), () => {
        this.router.navigate(['/identification']);
      });
    });
  }
}
