import { Question, CategorySummary } from '../types/quiz';

export const CATEGORIES: CategorySummary[] = [
  {
    id: 'neuroscience',
    name: 'Cognitive Neuroscience',
    description: 'Neural circuits, synaptic plasticity, action potential biophysics, and memory consolidation.',
    totalQuestions: 6,
    topics: ['Synaptic Plasticity', 'Action Potentials', 'Memory Consolidation', 'Neurotransmitters'],
    color: '#7C3AED',
  },
  {
    id: 'systems',
    name: 'Distributed Systems & Algorithms',
    description: 'Consensus protocols, linearizability, caching strategies, and concurrency primitives.',
    totalQuestions: 6,
    topics: ['Raft & Paxos', 'Vector Clocks', 'Cache Invalidation', 'Byzantine Faults'],
    color: '#2563EB',
  },
  {
    id: 'biochemistry',
    name: 'Biochemistry & Molecular Genetics',
    description: 'Enzyme kinetics, metabolic pathways, DNA repair mechanisms, and allosteric regulation.',
    totalQuestions: 6,
    topics: ['Enzyme Kinetics', 'Cellular Respiration', 'CRISPR Mechanics', 'Allosteric Regulation'],
    color: '#06B6D4',
  },
  {
    id: 'quantum',
    name: 'Quantum Information & Physics',
    description: 'Quantum superposition, entanglement verification, density matrices, and quantum gates.',
    totalQuestions: 6,
    topics: ['Superposition', 'Bell Inequalities', 'Quantum Gates', 'Decoherence'],
    color: '#4F46E5',
  },
];

export const INITIAL_QUESTIONS: Question[] = [
  // --- Cognitive Neuroscience ---
  {
    id: 'neuro-1',
    category: 'Cognitive Neuroscience',
    topic: 'Synaptic Plasticity',
    stem: 'During Long-Term Potentiation (LTP) induction at hippocampal CA1-CA3 Schaffer collateral synapses, which biophysical event is strictly required to unblock postsynaptic NMDA receptors?',
    codeOrContext: 'Membrane potential: -70 mV → Sustained depolarization > -30 mV via high-frequency tetanic stimulation.',
    options: [
      'Magnesium ion (Mg²⁺) electro-repulsion driven by AMPA-mediated membrane depolarization',
      'Direct phosphorylation of the NR2B regulatory subunit by retrograde Nitric Oxide',
      'Calcium influx through low-voltage-activated T-type calcium channels',
      'Cleavage of extracellular matrix agrin by matrix metalloproteinases'
    ],
    correctIndex: 0,
    explanation: 'NMDA receptors are tonically blocked by extracellular Mg²⁺ ions at resting membrane potentials (-70 mV). Strong, repeated glutamate release activates AMPA receptors, causing sufficient sodium influx and local depolarization (towards -30 to -20 mV). This positive potential electrostatically dislodges the divalent Mg²⁺ plug from the channel pore, allowing Ca²⁺ influx.',
    keyConcept: 'LTP NMDA receptor activation functions as a coincidence detector requiring both presynaptic glutamate binding and postsynaptic depolarization to relieve the Mg²⁺ blockade.',
    difficulty: 'Advanced',
    hint: 'Consider the divalent cation that physically lodges inside the pore at hyperpolarized resting states.',
  },
  {
    id: 'neuro-2',
    category: 'Cognitive Neuroscience',
    topic: 'Action Potentials',
    stem: 'In mammalian myelinated axons, why does saltatory conduction propagate significantly faster and with lower metabolic cost than continuous conduction?',
    codeOrContext: 'Hodgkin-Huxley Cable Equation: λ = √(rm / ri), where rm is membrane resistance and ri is axial resistance.',
    options: [
      'Myelin increases membrane resistance (rm) and decreases capacitance (cm), allowing electrotonic current to charge adjacent Nodes of Ranvier rapidly',
      'Myelin provides an active enzymatic electron transport chain along the internodal axolemma',
      'Voltage-gated potassium channels are packed uniformly throughout the internodal segments',
      'Action potentials skip the intermediate axoplasm entirely via optical quantum tunneling'
    ],
    correctIndex: 0,
    explanation: 'Myelin acts as an electrical insulator, drastically increasing membrane resistance (rm) while decreasing membrane capacitance (cm). Because fewer charges are required to depolarize the membrane across the internode, the length constant (λ) is lengthened, and current travels almost instantaneously between unmyelinated Nodes of Ranvier where Na⁺ channels are clustered.',
    keyConcept: 'Saltatory conduction leverages high membrane resistance and low capacitance to boost electrotonic current spread between Nodes of Ranvier.',
    difficulty: 'Intermediate',
    hint: 'Think about how insulation alters capacitance (cm) and prevents charge dissipation across the membrane.',
  },
  {
    id: 'neuro-3',
    category: 'Cognitive Neuroscience',
    topic: 'Memory Consolidation',
    stem: 'Which transcription factor is canonically phosphorylated by Protein Kinase A (PKA) and MAPK to trigger late-phase LTP (L-LTP) and de novo protein synthesis in the nucleus?',
    codeOrContext: 'Signal cascade: Ca²⁺ → Calmodulin → Adenylyl Cyclase → cAMP → PKA catalytic subunit translocation → Nucleus.',
    options: [
      'CREB (cAMP Response Element-Binding Protein)',
      'NF-κB (Nuclear Factor kappa-light-chain-enhancer of activated B cells)',
      'p53 Tumor Suppressor Protein',
      'HIF-1α (Hypoxia-Inducible Factor 1-alpha)'
    ],
    correctIndex: 0,
    explanation: 'Late-phase LTP requires structural remodeling and new protein synthesis. Catalytic subunits of PKA translocate into the nucleus and phosphorylate CREB at Serine-133, which recruits the coactivator CBP (CREB-binding protein) to initiate transcription of immediate early genes like c-Fos and BDNF.',
    keyConcept: 'Phosphorylation of CREB at Ser133 by PKA/MAPK is the molecular switch converting transient synaptic activity into permanent synaptic consolidation.',
    difficulty: 'Intermediate',
    hint: 'This ubiquitous leucine-zipper transcription factor specifically binds the cAMP response element DNA motif.',
  },

  // --- Distributed Systems ---
  {
    id: 'sys-1',
    category: 'Distributed Systems & Algorithms',
    topic: 'Raft & Paxos',
    stem: 'In the Raft consensus algorithm, under what precise condition may a leader safely commit a log entry from an earlier term?',
    codeOrContext: 'Scenario: Leader is elected in Term 4 and discovers uncommitted replicated entries from Term 2 on a majority of nodes.',
    options: [
      'Only once an entry from its current term (Term 4) is successfully replicated on a majority of followers',
      'Immediately upon receiving acknowledgments from any two follower nodes regardless of term',
      'By overwriting all earlier logs with null-operation placeholders in Term 3',
      'As soon as a random election timeout expires without receiving heartbeats'
    ],
    correctIndex: 0,
    explanation: 'Raft never commits an entry from a previous term solely by counting replicas (Section 5.4.2 of Ongaro & Ousterhout). Doing so risks subtle log-overwriting bugs during cascading leader crashes. Instead, Raft requires a leader to replicate an entry from its own current term to a majority; once achieved, all preceding entries are committed indirectly.',
    keyConcept: 'In Raft, entries from prior terms are only committed indirectly by committing a log entry belonging to the leader\'s current term.',
    difficulty: 'Advanced',
    hint: 'Look for the rule preventing direct majority-counting of historical term logs without an anchor in the current term.',
  },
  {
    id: 'sys-2',
    category: 'Distributed Systems & Algorithms',
    topic: 'Vector Clocks',
    stem: 'Given two concurrent event timestamps V(A) = [3, 1, 4] and V(B) = [2, 2, 4] across 3 processes, what is the causality relation between Event A and Event B?',
    codeOrContext: 'Vector Clock partial ordering: V(x) ≤ V(y) iff ∀k, V(x)[k] ≤ V(y)[k] and ∃k, V(x)[k] < V(y)[k].',
    options: [
      'The events are concurrent (A || B) with no definite causal precedence',
      'Event A strictly happened-before Event B (A → B)',
      'Event B strictly happened-before Event A (B → A)',
      'The vector clocks represent an invalid state and require resynchronization'
    ],
    correctIndex: 0,
    explanation: 'For A to precede B, every component of V(A) must be ≤ V(B). Here, V(A)[0] = 3 > V(B)[0] = 2 (so A cannot precede B), while V(A)[1] = 1 < V(B)[1] = 2 (so B cannot precede A). Neither vector is strictly less than the other; hence the events are concurrent (A || B).',
    keyConcept: 'Events are concurrent if neither vector clock dominates the other component-wise.',
    difficulty: 'Intermediate',
    hint: 'Compare index 0 (3 vs 2) and index 1 (1 vs 2).',
  },
  {
    id: 'sys-3',
    category: 'Distributed Systems & Algorithms',
    topic: 'Cache Invalidation',
    stem: 'In high-throughput microservice architectures, which caching pattern completely mitigates the "Thundering Herd" (Cache Stampede) problem when a hot key expires?',
    codeOrContext: 'High concurrency: 50,000 requests/sec for key "product:featured:4910"',
    options: [
      'Probabilistic early expiration (XFetch algorithm) combined with distributed mutex locks on cache miss',
      'Reducing TTL to 100 milliseconds across all edge CDN nodes',
      'Evicting all related cache keys simultaneously using wildcard SCAN',
      'Switching from Redis cluster to in-memory local maps on every replica'
    ],
    correctIndex: 0,
    explanation: 'The XFetch algorithm probabilistically recomputes the cache value in the background before the key actually expires based on request compute time and access frequency. Coupled with a single-flight or distributed lock on cache miss, only one worker recomputes the hot key while others serve stale data or wait.',
    keyConcept: 'Mitigate cache stampedes using probabilistic early background refreshes (XFetch) and single-flight lock deduplication.',
    difficulty: 'Advanced',
    hint: 'Look for proactive background computation before the TTL hard-drops alongside mutex coordination.',
  },

  // --- Biochemistry ---
  {
    id: 'bio-1',
    category: 'Biochemistry & Molecular Genetics',
    topic: 'Enzyme Kinetics',
    stem: 'How do the kinetic constants Vmax and Km change in the presence of a reversible competitive inhibitor on a Lineweaver-Burk double-reciprocal plot?',
    codeOrContext: 'Lineweaver-Burk Equation: 1/V = (Km / Vmax) · (1/[S]) + 1/Vmax',
    options: [
      'Km increases (apparent affinity decreases), while Vmax remains unaltered',
      'Vmax decreases, while Km remains unchanged',
      'Both Vmax and Km decrease by an identical proportional factor (parallel shift)',
      'Both Vmax and Km increase proportionally'
    ],
    correctIndex: 0,
    explanation: 'Competitive inhibitors bind exclusively to the free enzyme\'s active site, competing directly with substrate. At infinitely high substrate concentrations ([S] → ∞), the substrate outcompetes the inhibitor, so Vmax is unaffected. However, a higher substrate concentration is required to reach 1/2 Vmax, meaning apparent Km increases.',
    keyConcept: 'Competitive inhibitors increase apparent Km without changing Vmax because excess substrate can overcome the competition.',
    difficulty: 'Intermediate',
    hint: 'Remember that competitive inhibitors can be outcompeted if you flood the system with substrate.',
  },
  {
    id: 'bio-2',
    category: 'Biochemistry & Molecular Genetics',
    topic: 'CRISPR Mechanics',
    stem: 'In the Streptococcus pyogenes CRISPR-Cas9 endonuclease system, what is the critical role of the Protospacer Adjacent Motif (PAM)?',
    codeOrContext: 'Canonical SpCas9 PAM sequence: 5′-NGG-3′ on the non-target DNA strand.',
    options: [
      'It acts as the obligatory initial binding license, allowing Cas9 to interrogate and melt adjacent DNA without cutting the host bacterial CRISPR array',
      'It acetylates the histone tails of target eucaryotic chromatin to promote open access',
      'It serves as the covalent attachment site for the single-guide RNA tracer',
      'It prevents the Cas9 protein from undergoing ubiquitin-mediated proteolysis'
    ],
    correctIndex: 0,
    explanation: 'Cas9 requires the 5′-NGG-3′ PAM to initiate DNA interrogation. Cas9 binds the PAM first via its C-terminal domain, which destabilizes adjacent base pairs and initiates RNA-DNA heteroduplex unwinding. Because bacterial CRISPR repeat loci lack this PAM sequence, it also prevents suicidal self-cleavage of the host genome.',
    keyConcept: 'The PAM sequence is the essential recognition gatekeeper for Cas9 binding and prevents self-targeting of bacterial immune memory.',
    difficulty: 'Advanced',
    hint: 'Think about how the bacterium protects its own CRISPR spacer storage locus from being chopped up by Cas9.',
  },
  {
    id: 'bio-3',
    category: 'Biochemistry & Molecular Genetics',
    topic: 'Allosteric Regulation',
    stem: 'Which physiological allosteric effector shifts the hemoglobin oxygen-dissociation curve rightward (Bohr Effect), facilitating oxygen unloading in actively metabolizing peripheral tissues?',
    codeOrContext: 'Oxygen Affinity Shift: Hb(O₂)₄ + H⁺ + 2,3-BPG ⇌ Deoxy-Hb + 4 O₂',
    options: [
      'Elevated concentration of 2,3-Bisphosphoglycerate (2,3-BPG) and high proton (H⁺) concentration (lower pH)',
      'Alkaline extracellular pH (> 7.6) and hypothermia (< 34°C)',
      'Carbon monoxide (CO) binding to the ferrous heme pocket',
      'Depletion of intracellular carbon dioxide (hypocapnia)'
    ],
    correctIndex: 0,
    explanation: 'A rightward shift in the oxygen-hemoglobin dissociation curve indicates reduced oxygen affinity, promoting O₂ release to tissues. This is induced by the physiological hallmarks of metabolically active muscle: high CO₂, high H⁺ (acidosis/lower pH), elevated temperature, and 2,3-BPG binding to the central cavity of the T-state (tense, deoxygenated) tetramer.',
    keyConcept: 'Acidic pH, elevated CO₂, and 2,3-BPG stabilize the low-affinity T-state of hemoglobin, shifting the curve rightward to unload oxygen.',
    difficulty: 'Intermediate',
    hint: 'Active tissues generate lactic acid and CO₂, lowering local pH and requiring more oxygen release.',
  },

  // --- Quantum Information ---
  {
    id: 'quant-1',
    category: 'Quantum Information & Physics',
    topic: 'Superposition',
    stem: 'Applying a Hadamard (H) gate to a pure computational basis state |0⟩ followed by a CNOT gate with target initialized to |0⟩ produces which maximally entangled Bell state?',
    codeOrContext: 'Circuit: |0⟩ ───[ H ]───●───\n                    │   \n|0⟩ ───────────────⊕───',
    options: [
      '|Φ⁺⟩ = (|00⟩ + |11⟩) / √2',
      '|Φ⁻⟩ = (|00⟩ - |11⟩) / √2',
      '|Ψ⁺⟩ = (|01⟩ + |10⟩) / √2',
      '|Ψ⁻⟩ = (|01⟩ - |10⟩) / √2'
    ],
    correctIndex: 0,
    explanation: 'The Hadamard gate maps |0⟩ to (|0⟩ + |1⟩)/√2. The state of the 2-qubit register is then (|00⟩ + |10⟩)/√2. The CNOT flips the second qubit if and only if the first qubit is |1⟩. Thus |00⟩ remains |00⟩, while |10⟩ becomes |11⟩, producing the canonical Bell state |Φ⁺⟩ = (|00⟩ + |11⟩)/√2.',
    keyConcept: 'The canonical Bell circuit (Hadamard on qubit 0, followed by CNOT from 0 to 1) transforms |00⟩ into the maximally entangled state |Φ⁺⟩.',
    difficulty: 'Intermediate',
    hint: 'Track what happens to each term: |00⟩ has control 0, while |10⟩ has control 1.',
  },
  {
    id: 'quant-2',
    category: 'Quantum Information & Physics',
    topic: 'Bell Inequalities',
    stem: 'What is the maximum correlation value predicted by quantum mechanics for the Clauser-Horne-Shimony-Holt (CHSH) Bell inequality (Tsirelson\'s bound), surpassing the classical local hidden variable limit of 2?',
    codeOrContext: 'CHSH correlator: S = |E(a,b) - E(a,b\') + E(a\',b) + E(a\',b\')|',
    options: [
      '2√2 ≈ 2.828',
      '4.000 (algebraic maximum for super-quantum PR boxes)',
      'π ≈ 3.14159',
      'e ≈ 2.718'
    ],
    correctIndex: 0,
    explanation: 'Local realism (classical hidden variables) bounds the CHSH parameter to S ≤ 2. In 1980, Boris Tsirelson proved that quantum mechanics permits non-local correlations that violate this bound, up to a fundamental maximum of S ≤ 2√2 ≈ 2.828. Achieving higher values (up to 4) requires non-signaling PR boxes not found in nature.',
    keyConcept: 'Tsirelson\'s bound states that quantum mechanical entanglement can achieve a CHSH correlation of at most 2√2.',
    difficulty: 'Advanced',
    hint: 'It involves a square root of 2 multiplying the classical bound.',
  },
  {
    id: 'quant-3',
    category: 'Quantum Information & Physics',
    topic: 'Quantum Gates',
    stem: 'What is the action of the single-qubit Pauli-Z gate on the state |+⟩ = (|0⟩ + |1⟩)/√2?',
    codeOrContext: 'Pauli-Z matrix: [[1, 0], [0, -1]]',
    options: [
      'Transforms |+⟩ into |-⟩ = (|0⟩ - |1⟩)/√2',
      'Leaves |+⟩ completely invariant',
      'Flips both amplitudes to give -|+⟩',
      'Transforms the state into the complex state |i+⟩ = (|0⟩ + i|1⟩)/√2'
    ],
    correctIndex: 0,
    explanation: 'The Pauli-Z gate leaves |0⟩ unchanged and maps |1⟩ to -|1⟩. When applied to |+⟩ = (|0⟩ + |1⟩)/√2, it yields Z|+⟩ = (|0⟩ - |1⟩)/√2 = |-⟩. In the Bloch sphere representation, this corresponds to a 180° rotation around the Z-axis, swapping the positive X-axis state for the negative X-axis state.',
    keyConcept: 'Pauli-Z applies a relative phase flip of π between |0⟩ and |1⟩, converting |+⟩ into |-⟩.',
    difficulty: 'Foundation',
    hint: 'Z maps |0⟩ to |0⟩ and |1⟩ to -|1⟩.',
  },
];
