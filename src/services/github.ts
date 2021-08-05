enum Sort {
  Created = 'created',
  Updated = 'updated',
  Comments = 'comments',
}

enum State {
  All = 'all',
  Open = 'open',
  Closed = 'closed',
}

enum Direction {
  Asc = 'asc',
  Desc = 'desc',
}

export type ListMilestonesOptions = {
  state?: State;
  sort?: Sort;
  direction?: Direction;
  page?: number;
  pageSize?: number;
};

export type ListIssuesOptions = {
  milestone: number;
  labels?: string;
  state?: State;
  sort?: Sort;
  direction?: Direction;
  page?: number;
  pageSize?: number;
};

export type ListCommentsOptions = {
  issue: number;
  sort?: Sort;
  direction?: Direction;
  page?: number;
  pageSize?: number;
};

export type User = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export type Milestone = {
  id: number;
  number: number;
  title: string;
  description: string;
  open_issues: number;
};

export type Issue = {
  id: number;
  number: number;
  title: string;
  state: State;
  body: string;
  comments: number;
  user: User;
  milestone: Milestone;
  labels: Label[];
  html_url: string;
  created_at: string;
  updated_at: string;
};

export type Label = {
  id: number;
  name: string;
  description: string;
  color: string;
};

export type Comment = {
  id: number;
  body_html: string;
  html_url: string;
  created_at: string;
  updated_at: string;
};

class Github {
  private apiBase = 'https://api.github.com';

  constructor(private token: string, private owner: string, private repo: string) {}

  private toQuery(raw: Record<string, unknown>) {
    const params = new URLSearchParams();

    Object.keys(raw).forEach((key) => {
      if (raw[key]) params.append(key, String(raw[key]));
    });

    return '?' + params.toString();
  }

  private hasNoBody(method: string) {
    return ['GET', 'HEAD', 'DELETE'].includes(method);
  }

  private async request(method: string, url: string, data?: Record<string, unknown>) {
    let query = '';

    if (data && this.hasNoBody(method)) {
      query = this.toQuery(data);
      data = undefined;
    }

    const response = await fetch([this.apiBase, url, query].join(''), {
      method,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${this.token}`,
      },
      body: data ? JSON.stringify(data) : undefined,
    });

    return response.json();
  }

  public async listMilestones(options: ListMilestonesOptions = {}): Promise<Milestone[]> {
    const { state, sort, direction, page, pageSize } = options;
    const query = { state, sort, direction, page, per_page: pageSize };

    return this.request('GET', `/repos/${this.owner}/${this.repo}/milestones`, query);
  }

  public async listIssues(options: ListIssuesOptions): Promise<Issue[]> {
    const { milestone, labels, state, sort, direction, page, pageSize } = options;

    const query = {
      milestone,
      labels,
      state,
      sort,
      direction,
      page,
      per_page: pageSize,
      creator: this.owner,
    };

    return this.request('GET', `/repos/${this.owner}/${this.repo}/issues`, query);
  }

  public getIssue(issue: number): Promise<Issue> {
    return this.request('GET', `/repos/${this.owner}/${this.repo}/issues/${issue}`);
  }

  public listComments(options: ListCommentsOptions): Promise<Comment[]> {
    const { issue, sort, direction, page, pageSize } = options;
    const query = { sort, direction, page, per_page: pageSize };

    return this.request('GET', `/repos/${this.owner}/${this.repo}/issues/${issue}/comments`, query);
  }
}

export default new Github(
  import.meta.env.VITE_GITHUB_ACCESS_TOKEN,
  import.meta.env.VITE_GITHUB_OWNER,
  import.meta.env.VITE_GITHUB_REPO,
);
