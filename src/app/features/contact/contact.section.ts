import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PortfolioStore } from '../../core/services/portfolio-store.service';
import { RevealDirective } from '../../shared/components/ui/reveal.directive';
import { IconComponent } from '../../shared/components/ui/icon.component';

@Component({
  selector: 'app-contact-section',
  imports: [ReactiveFormsModule, RevealDirective, IconComponent],
  templateUrl: './contact.section.html',
  styleUrl: './contact.section.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactSection {
  private readonly store = inject(PortfolioStore);
  private readonly fb = inject(FormBuilder);

  readonly contact = this.store.contact;
  readonly submitting = signal(false);
  readonly sent = signal(false);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.sent.set(false);

    const v = this.form.getRawValue();
    const to = this.contact()?.email ?? '';
    const subject = encodeURIComponent(v.subject || `Portfolio inquiry from ${v.name}`);
    const body = encodeURIComponent(
      `Name: ${v.name}\nEmail: ${v.email}\n\n${v.message}\n\n— Sent from portfolio site`
    );

    await new Promise((r) => setTimeout(r, 450));
    this.submitting.set(false);
    this.sent.set(true);

    if (to) {
      window.open(`mailto:${to}?subject=${subject}&body=${body}`, '_blank');
    }

    this.form.reset();
  }
}

