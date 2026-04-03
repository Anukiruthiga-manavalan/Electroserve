import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UpperCasePipe } from '@angular/common';

interface DiagnosisResult {
  fault: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  suggestedService: string;
  providerType: 'electrician' | 'plumber';
  estimatedCost: string;
  urgency: string;
  diyTips: string[];
  safetyWarning?: string;
}

interface Symptom {
  id: string;
  label: string;
  icon: string;
  category: 'electrical' | 'plumbing';
}

@Component({
  selector: 'app-fault-diagnosis',
  standalone: true,
  imports: [FormsModule, RouterLink, UpperCasePipe],
  templateUrl: './fault-diagnosis.html',
  styleUrl: './fault-diagnosis.scss'
})
export class FaultDiagnosis {
  selectedCategory = signal<'electrical' | 'plumbing' | ''>('');
  selectedSymptoms = signal<string[]>([]);
  additionalInfo = '';
  diagnosisResult = signal<DiagnosisResult | null>(null);
  isAnalyzing = signal(false);

  electricalSymptoms: Symptom[] = [
    { id: 'flickering', label: 'Lights flickering', icon: 'lightbulb', category: 'electrical' },
    { id: 'tripping', label: 'MCB/Circuit breaker tripping', icon: 'power_off', category: 'electrical' },
    { id: 'shock', label: 'Electric shock from appliance', icon: 'bolt', category: 'electrical' },
    { id: 'no-power', label: 'No power in room/area', icon: 'power_settings_new', category: 'electrical' },
    { id: 'sparking', label: 'Sparking from switch/socket', icon: 'flash_on', category: 'electrical' },
    { id: 'burning-smell', label: 'Burning smell from wiring', icon: 'local_fire_department', category: 'electrical' },
    { id: 'overheating', label: 'Switch/outlet feels hot', icon: 'thermostat', category: 'electrical' },
    { id: 'buzzing', label: 'Buzzing/humming sound', icon: 'volume_up', category: 'electrical' },
    { id: 'high-bill', label: 'Unusually high electric bill', icon: 'receipt_long', category: 'electrical' },
    { id: 'fan-slow', label: 'Fan running slow', icon: 'mode_fan_off', category: 'electrical' },
  ];

  plumbingSymptoms: Symptom[] = [
    { id: 'leak-pipe', label: 'Pipe leaking', icon: 'water_drop', category: 'plumbing' },
    { id: 'leak-faucet', label: 'Faucet dripping', icon: 'faucet', category: 'plumbing' },
    { id: 'blocked-drain', label: 'Drain blocked/slow', icon: 'water', category: 'plumbing' },
    { id: 'no-hot-water', label: 'No hot water', icon: 'hot_tub', category: 'plumbing' },
    { id: 'low-pressure', label: 'Low water pressure', icon: 'speed', category: 'plumbing' },
    { id: 'toilet-running', label: 'Toilet constantly running', icon: 'bathroom', category: 'plumbing' },
    { id: 'water-discolor', label: 'Discolored water', icon: 'water_damage', category: 'plumbing' },
    { id: 'bad-smell', label: 'Bad smell from drain', icon: 'air', category: 'plumbing' },
    { id: 'noise-pipe', label: 'Noisy/banging pipes', icon: 'volume_up', category: 'plumbing' },
    { id: 'water-pooling', label: 'Water pooling on floor', icon: 'waves', category: 'plumbing' },
  ];

  get currentSymptoms(): Symptom[] {
    return this.selectedCategory() === 'electrical' ? this.electricalSymptoms : this.plumbingSymptoms;
  }

  selectCategory(cat: 'electrical' | 'plumbing') {
    this.selectedCategory.set(cat);
    this.selectedSymptoms.set([]);
    this.diagnosisResult.set(null);
  }

  toggleSymptom(id: string) {
    this.selectedSymptoms.update(s => {
      if (s.includes(id)) return s.filter(x => x !== id);
      return [...s, id];
    });
  }

  isSelected(id: string): boolean {
    return this.selectedSymptoms().includes(id);
  }

  runDiagnosis() {
    if (this.selectedSymptoms().length === 0) return;
    this.isAnalyzing.set(true);
    this.diagnosisResult.set(null);

    // Simulate AI analysis delay
    setTimeout(() => {
      const result = this.analyze();
      this.diagnosisResult.set(result);
      this.isAnalyzing.set(false);
    }, 2000);
  }

  private analyze(): DiagnosisResult {
    const symptoms = this.selectedSymptoms();
    const cat = this.selectedCategory();

    if (cat === 'electrical') {
      if (symptoms.includes('burning-smell') || symptoms.includes('sparking')) {
        return {
          fault: 'Potential Short Circuit / Wire Damage',
          severity: 'critical',
          description: 'Sparking or burning smell indicates damaged insulation, loose connections, or overloaded circuits. This is a fire hazard and needs immediate professional attention.',
          suggestedService: 'Emergency Electrical Repair',
          providerType: 'electrician',
          estimatedCost: '₹500 – ₹3,000',
          urgency: 'IMMEDIATE — Turn off main switch now',
          diyTips: ['Turn off main power immediately', 'Do NOT touch any exposed wires', 'Evacuate if you see smoke', 'Call an electrician right away'],
          safetyWarning: '⚠️ DANGER: Do not attempt DIY repair. Risk of fire and electrocution.'
        };
      }
      if (symptoms.includes('shock')) {
        return {
          fault: 'Earthing / Grounding Fault',
          severity: 'high',
          description: 'Electric shocks from appliances usually indicate faulty earthing, damaged appliance insulation, or absence of RCCB/ELCB protection.',
          suggestedService: 'Earthing & Safety Inspection',
          providerType: 'electrician',
          estimatedCost: '₹800 – ₹2,500',
          urgency: 'URGENT — Stop using affected appliance',
          diyTips: ['Unplug the appliance immediately', 'Check if the 3-pin plug has an earth pin', 'Do not use the appliance until inspected'],
          safetyWarning: '⚠️ Do not ignore electric shocks. They can be life-threatening.'
        };
      }
      if (symptoms.includes('tripping')) {
        return {
          fault: 'Circuit Overload / MCB Fault',
          severity: 'medium',
          description: 'Repeated MCB tripping can be caused by overloaded circuits, short circuits in appliances, or a faulty MCB. Could also indicate wiring issues.',
          suggestedService: 'Circuit Inspection & MCB Replacement',
          providerType: 'electrician',
          estimatedCost: '₹300 – ₹1,500',
          urgency: 'Within 24 hours',
          diyTips: ['Unplug all appliances on the circuit', 'Reset the MCB', 'Plug in appliances one by one to identify the faulty one', 'If MCB keeps tripping with nothing plugged in, call electrician'],
        };
      }
      if (symptoms.includes('flickering') || symptoms.includes('fan-slow')) {
        return {
          fault: 'Voltage Fluctuation / Loose Connection',
          severity: 'low',
          description: 'Flickering lights or slow fans often indicate voltage fluctuation, loose wiring connections, or overloaded circuits in your home.',
          suggestedService: 'Wiring Inspection & Voltage Stabilization',
          providerType: 'electrician',
          estimatedCost: '₹200 – ₹1,000',
          urgency: 'Schedule within a week',
          diyTips: ['Check if the bulb is properly screwed in', 'Try a different bulb to rule out bulb issue', 'Check if the issue is in one room or the whole house', 'A voltage stabilizer may help temporarily'],
        };
      }
      if (symptoms.includes('no-power')) {
        return {
          fault: 'Power Supply Failure',
          severity: 'medium',
          description: 'Complete power loss in a room or area could be due to a tripped breaker, blown fuse, or wiring fault. Check other rooms to determine scope.',
          suggestedService: 'Fault Finding & Power Restoration',
          providerType: 'electrician',
          estimatedCost: '₹300 – ₹2,000',
          urgency: 'Same day',
          diyTips: ['Check if it is a power cut (check neighbours)', 'Check your main switch board for tripped MCBs', 'If only one room affected, the issue is likely localized wiring'],
        };
      }
      return {
        fault: 'General Electrical Issue',
        severity: 'medium',
        description: 'Based on your symptoms, there may be a wiring or appliance issue that needs professional inspection. An electrician can diagnose the exact cause.',
        suggestedService: 'General Electrical Inspection',
        providerType: 'electrician',
        estimatedCost: '₹200 – ₹1,500',
        urgency: 'Schedule within a few days',
        diyTips: ['Note when the issue occurs', 'Check if specific appliances trigger it', 'Keep area dry and well-ventilated'],
      };
    } else {
      // Plumbing
      if (symptoms.includes('water-pooling') || (symptoms.includes('leak-pipe') && symptoms.includes('noise-pipe'))) {
        return {
          fault: 'Major Pipe Burst / Leak',
          severity: 'critical',
          description: 'Water pooling combined with pipe issues indicates a burst pipe or major leak. This can cause significant water damage and mold growth.',
          suggestedService: 'Emergency Pipe Repair',
          providerType: 'plumber',
          estimatedCost: '₹800 – ₹5,000',
          urgency: 'IMMEDIATE — Shut off main water valve',
          diyTips: ['Turn off main water supply immediately', 'Move furniture and electronics away from water', 'Use towels/buckets to contain water', 'Open windows for ventilation'],
          safetyWarning: '⚠️ Water near electrical outlets is extremely dangerous. Turn off power in affected area.'
        };
      }
      if (symptoms.includes('leak-pipe')) {
        return {
          fault: 'Pipe Leak',
          severity: 'medium',
          description: 'A leaking pipe can be caused by corrosion, loose joints, or high water pressure. If not fixed, it can lead to water damage and mold.',
          suggestedService: 'Pipe Repair & Replacement',
          providerType: 'plumber',
          estimatedCost: '₹300 – ₹2,000',
          urgency: 'Within 24 hours',
          diyTips: ['Place a bucket under the leak', 'Try tightening the joint (if accessible)', 'Use plumber tape for small leaks temporarily', 'Turn off water to the affected area if severe'],
        };
      }
      if (symptoms.includes('blocked-drain') || symptoms.includes('bad-smell')) {
        return {
          fault: 'Blocked Drain / Sewer Issue',
          severity: 'medium',
          description: 'Slow drains or bad smells indicate a blockage in the drain or sewer line. Could be buildup of grease, hair, or foreign objects.',
          suggestedService: 'Drain Cleaning & Sewer Inspection',
          providerType: 'plumber',
          estimatedCost: '₹400 – ₹2,000',
          urgency: 'Within 1-2 days',
          diyTips: ['Pour boiling water down the drain', 'Use a plunger', 'Try baking soda + vinegar solution', 'Avoid chemical drain cleaners (they damage pipes)'],
        };
      }
      if (symptoms.includes('no-hot-water')) {
        return {
          fault: 'Water Heater / Geyser Malfunction',
          severity: 'low',
          description: 'No hot water could be due to a thermostat issue, heating element failure, or gas supply problem. May need repair or replacement.',
          suggestedService: 'Water Heater Repair',
          providerType: 'plumber',
          estimatedCost: '₹500 – ₹3,000',
          urgency: 'Schedule within a few days',
          diyTips: ['Check if the geyser power switch is on', 'Check thermostat settings', 'Check if pilot light is working (gas geyser)', 'Allow 15-20 minutes for water to heat up'],
        };
      }
      if (symptoms.includes('low-pressure')) {
        return {
          fault: 'Low Water Pressure',
          severity: 'low',
          description: 'Low water pressure can be caused by clogged pipes, a faulty pressure regulator, or municipal supply issues.',
          suggestedService: 'Pressure Inspection & Pipe Cleaning',
          providerType: 'plumber',
          estimatedCost: '₹300 – ₹1,500',
          urgency: 'Schedule within a week',
          diyTips: ['Check if all taps are affected or just one', 'Clean the faucet aerator (mesh filter)', 'Check if neighbours have the same issue', 'Check your water tank level'],
        };
      }
      return {
        fault: 'General Plumbing Issue',
        severity: 'medium',
        description: 'Based on your symptoms, there is a plumbing issue that needs professional inspection. A qualified plumber can diagnose and fix the problem.',
        suggestedService: 'General Plumbing Inspection',
        providerType: 'plumber',
        estimatedCost: '₹200 – ₹1,500',
        urgency: 'Schedule within a few days',
        diyTips: ['Note when the issue occurs', 'Check all taps/fixtures to identify scope', 'Keep the area dry'],
      };
    }
  }

  getSeverityClass(severity: string): string {
    return `severity-${severity}`;
  }

  reset() {
    this.selectedCategory.set('');
    this.selectedSymptoms.set([]);
    this.additionalInfo = '';
    this.diagnosisResult.set(null);
  }
}
