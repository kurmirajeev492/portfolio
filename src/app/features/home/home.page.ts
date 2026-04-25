import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { HeroSection } from './hero.section';
import { AboutSection } from '../about/about.section';
import { SkillsSection } from '../skills/skills.section';
import { ExperienceSection } from '../experience/experience.section';
import { ProjectsSection } from '../projects/projects.section';
import { ContactSection } from '../contact/contact.section';
import { VisitorService } from '../../core/services/visitor.service';

@Component({
  selector: 'app-home-page',
  imports: [HeroSection, AboutSection, SkillsSection, ExperienceSection, ProjectsSection, ContactSection],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  private readonly visitors = inject(VisitorService);

  ngOnInit(): void {
    void this.visitors.hitAndGetCount();
  }
}

